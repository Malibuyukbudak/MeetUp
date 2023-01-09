using MediatR;
using MeetUp.Core.CQRS;
using MeetUp.Data.UnitOfWorks;
using System.Transactions;

namespace MeetUp.Data.Behaviours
{
    public class TransactionBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>, IBaseCommand<TResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public TransactionBehavior(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var response = await next();
                    await _unitOfWork.SaveChanges();
                    scope.Complete();
                    return response;
                }
                catch
                {
                    scope.Dispose();
                    throw;
                }
            }
        }
    }
}
