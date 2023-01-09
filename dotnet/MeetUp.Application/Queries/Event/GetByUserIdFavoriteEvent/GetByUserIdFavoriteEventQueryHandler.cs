using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using MeetUp.Domain.Entities;

namespace MeetUp.Application.Queries.Event.GetByUserIdFavoriteEvent
{
    public class GetByUserIdFavoriteEventQueryHandler : IRequestHandler<GetByUserIdFavoriteEventQuery, List<GetByUserIdFavoriteEventQueryResponse>>
    {
        private readonly IGenericRepository<Domain.Entities.FavoriteEvent> _genericFavoriteEventRepository;
        private readonly IGenericRepository<Domain.Entities.Event> _genericEventRepository;
        private readonly IGenericRepository<Domain.Entities.Categories> _categoriesRepository;
        private readonly IGenericRepository<FavoriteEvent> _favoriteEventRepository;
        private readonly IGenericRepository<JoinedEvent> _joinedEventRepository;
        private readonly IUserAccessor _userAccessor;

        public GetByUserIdFavoriteEventQueryHandler(IUnitOfWork _unitOfWork, IUserAccessor userAccessor)
        {
            _genericFavoriteEventRepository = _unitOfWork.GenericRepository<FavoriteEvent>();
            _genericEventRepository = _unitOfWork.GenericRepository<Domain.Entities.Event>();
            _favoriteEventRepository = _unitOfWork.GenericRepository<FavoriteEvent>();
            _joinedEventRepository = _unitOfWork.GenericRepository<JoinedEvent>();
            _categoriesRepository = _unitOfWork.GenericRepository<Domain.Entities.Categories>();
            _userAccessor = userAccessor;
        }
        public async Task<List<GetByUserIdFavoriteEventQueryResponse>> Handle(GetByUserIdFavoriteEventQuery request, CancellationToken cancellationToken)
        {

            var favoriteEventIdToEventId = _genericFavoriteEventRepository
                .GetAllQuery(x => x.UserId == _userAccessor.UserId)
                .Join(_genericEventRepository.GetAllQuery(), fe => fe.EventId, e => e.Id, (fe, e) => new { FavoriteEvent = fe, Event = e }).ToList();

            var result = new List<GetByUserIdFavoriteEventQueryResponse>();

            foreach (var item in favoriteEventIdToEventId)
            {
                result.Add(new()
                {
                    Event =
                    new GetAllEvent.GetAllEventQueryResponse
                    {
                        Id = item.Event.Id,
                        Capacity = item.Event.Capacity,
                        City = item.Event.City,
                        Created = item.Event.Created,
                        State = item.Event.State,
                        Description = item.Event.Description,
                        Image = item.Event.Image,
                        Title = item.Event.Title,
                        Categories = await _categoriesRepository.GetByIdAsync(item.Event.CategoryId),
                        User = null,
                    },
                    Id = item.FavoriteEvent.Id,
                    FavoriteCount = _favoriteEventRepository.GetAllQuery(x => x.EventId == item.Event.Id).Count(),
                    JoinedCount = _joinedEventRepository.GetAllQuery(x => x.EventId == item.Event.Id).Count()
                });
            }
            return result;
        }
    }
}
