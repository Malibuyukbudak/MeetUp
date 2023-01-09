using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Commands.Event.DeleteFavoriteEvent
{
    public class DeleteFavoriteEventCommandHandler : IRequestHandler<DeleteFavoriteEventCommand, bool>
    {
        private readonly IGenericRepository<Domain.Entities.FavoriteEvent> _genericFavoriteRepository;
        private readonly IUserAccessor _userAccessor;

        public DeleteFavoriteEventCommandHandler(IUnitOfWork unitOfWork, IUserAccessor userAccessor)
        {
            _genericFavoriteRepository = unitOfWork.GenericRepository<Domain.Entities.FavoriteEvent>();
            _userAccessor = userAccessor;
        }
        public async Task<bool> Handle(DeleteFavoriteEventCommand request, CancellationToken cancellationToken)
        {
            var favoriteEvent = await _genericFavoriteRepository.GetWhere(x => (x.EventId == request.Id) && (x.UserId == _userAccessor.UserId));
            return favoriteEvent?.Id != null ? await _genericFavoriteRepository.DeleteAsync(favoriteEvent.Id) : false;
        }
    }
}
