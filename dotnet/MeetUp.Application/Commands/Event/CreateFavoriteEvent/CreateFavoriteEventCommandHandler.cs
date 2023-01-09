using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using Microsoft.AspNetCore.Http;

namespace MeetUp.Application.Commands.Event.CreateFavoriteEvent
{
    public class CreateFavoriteEventCommandHandler : IRequestHandler<CreateFavoriteEventCommand, bool>
    {
        private readonly IGenericRepository<Domain.Entities.FavoriteEvent> _genericFavoriteRepository;
        private readonly IUserAccessor _userAccessor;
        public CreateFavoriteEventCommandHandler(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IUserAccessor userAccessor)
        {
            _genericFavoriteRepository = unitOfWork.GenericRepository<Domain.Entities.FavoriteEvent>();
            _userAccessor = userAccessor;
        }
        public async Task<bool> Handle(CreateFavoriteEventCommand request, CancellationToken cancellationToken)
        {
            var isFavorite = _genericFavoriteRepository.GetAllQuery(x => (x.EventId == request.FavoriteEvent.Id) && (x.UserId == _userAccessor.UserId));
            if (isFavorite?.Count() == 0)
            {
                request.FavoriteEvent.UserId = _userAccessor.UserId;
                return await _genericFavoriteRepository.AddAsync(request.FavoriteEvent);
            }
            else
            {
                return false;
            }

        }
    }
}
