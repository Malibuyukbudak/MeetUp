using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using MeetUp.Domain.Entities;

namespace MeetUp.Application.Commands.Event.CreateJoinEvent
{
    public class CreateJoinEventCommandHandler : IRequestHandler<CreateJoinEventCommand, bool>
    {
        private readonly IGenericRepository<JoinedEvent> _genericRepository;
        private readonly IUserAccessor _userAccessor;
        public CreateJoinEventCommandHandler(IUnitOfWork unitOfWork, IUserAccessor userAccessor)
        {
            _genericRepository = unitOfWork.GenericRepository<JoinedEvent>();
            _userAccessor = userAccessor;
        }

        public async Task<bool> Handle(CreateJoinEventCommand request, CancellationToken cancellationToken)
        {
            request.JoinedEvent.UserId = _userAccessor.UserId;
            return await _genericRepository.AddAsync(request.JoinedEvent);
        }
    }
}
