using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Commands.Event.DeleteJoinEvent
{
    public class DeleteJoinEventCommandHandler : IRequestHandler<DeleteJoinEventCommand, bool>
    {
        private readonly IGenericRepository<Domain.Entities.JoinedEvent> genericJoinedRepository;
        private readonly IUserAccessor _userAccessor;
        public DeleteJoinEventCommandHandler(IUnitOfWork unitOfWork, IUserAccessor userAccessor)
        {
            genericJoinedRepository = unitOfWork.GenericRepository<Domain.Entities.JoinedEvent>();
            _userAccessor = userAccessor;
        }
        public async Task<bool> Handle(DeleteJoinEventCommand request, CancellationToken cancellationToken)
        {
            var joinedEvent = await genericJoinedRepository.GetWhere(x => (x.EventId == request.Id) && (x.UserId == _userAccessor.UserId));
            return joinedEvent?.Id != null ? await genericJoinedRepository.DeleteAsync(joinedEvent.Id) : false;
        }
    }
}
