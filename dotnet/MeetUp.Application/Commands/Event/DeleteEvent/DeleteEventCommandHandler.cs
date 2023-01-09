using MediatR;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Commands.Event.DeleteEvent
{
    public class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand, bool>
    {

        private readonly IGenericRepository<Domain.Entities.Event> _genericEventRepository;
        private readonly IGenericRepository<Domain.Entities.FavoriteEvent> _genericFavoriteEventRepository;
        private readonly IGenericRepository<Domain.Entities.JoinedEvent> _genericJoinedEventRepository;


        public DeleteEventCommandHandler(IUnitOfWork unitOfWork)
        {
            _genericEventRepository = unitOfWork.GenericRepository<Domain.Entities.Event>();
            _genericFavoriteEventRepository = unitOfWork.GenericRepository<Domain.Entities.FavoriteEvent>();
            _genericJoinedEventRepository = unitOfWork.GenericRepository<Domain.Entities.JoinedEvent>();
        }
        public async Task<bool> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
        {
            var favoriteEvents = _genericFavoriteEventRepository.GetAllQuery(x => x.EventId == request.Id);
            foreach (var item in favoriteEvents)
            {

                _genericFavoriteEventRepository.Delete(item);
            }

            var joinedEvents = _genericJoinedEventRepository.GetAllQuery(x => x.EventId == request.Id);

            foreach (var item in joinedEvents)
            {

                _genericJoinedEventRepository.Delete(item);
            }

            return await _genericEventRepository.DeleteAsync(request.Id);
        }
    }
}
