using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Commands.Event.CreateEvent
{
    public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, bool>
    {
        private readonly IGenericRepository<Domain.Entities.Event> _genericRepository;
        private readonly IUserAccessor _userAccessor;

        public CreateEventCommandHandler(IUnitOfWork unitOfWork, IUserAccessor userAccessor)
        {
            _genericRepository = unitOfWork.GenericRepository<Domain.Entities.Event>();
            _userAccessor = userAccessor;
        }
        public async Task<bool> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            request.Event.UserId = _userAccessor.UserId;
            return await _genericRepository.AddAsync(request.Event);
        }
    }
}
