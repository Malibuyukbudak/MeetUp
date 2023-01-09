using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using MeetUp.Domain.Entities;

namespace MeetUp.Application.Queries.Event.GetByUserIdJoinedEvent
{
    public class GetByUserIdJoinedEventQueryHandler : IRequestHandler<GetByUserIdJoinedEventQuery, List<GetByUserIdJoinedEventQueryResponse>>
    {
        private readonly IGenericRepository<JoinedEvent> _genericJoinedEventRepository;
        private readonly IGenericRepository<Domain.Entities.Event> _genericEventRepository;
        private readonly IGenericRepository<Domain.Entities.Categories> _categoriesRepository;
        private readonly IGenericRepository<FavoriteEvent> _favoriteEventRepository;
        private readonly IGenericRepository<JoinedEvent> _joinedEventRepository;
        private readonly IUserAccessor _userAccessor;
        public GetByUserIdJoinedEventQueryHandler(IUnitOfWork _unitOfWork, IUserAccessor userAccessor)
        {
            _genericJoinedEventRepository = _unitOfWork.GenericRepository<JoinedEvent>();
            _genericEventRepository = _unitOfWork.GenericRepository<Domain.Entities.Event>();
            _categoriesRepository = _unitOfWork.GenericRepository<Domain.Entities.Categories>();
            _favoriteEventRepository = _unitOfWork.GenericRepository<FavoriteEvent>();
            _joinedEventRepository = _unitOfWork.GenericRepository<JoinedEvent>();
            _userAccessor = userAccessor;
        }
        public async Task<List<GetByUserIdJoinedEventQueryResponse>> Handle(GetByUserIdJoinedEventQuery request, CancellationToken cancellationToken)
        {
            var favoriteEventIdToEventId = _genericJoinedEventRepository
            .GetAllQuery(x => x.UserId == _userAccessor.UserId)
            .Join(_genericEventRepository.GetAllQuery(), fe => fe.EventId, e => e.Id, (fe, e) => new { JoinedEvent = fe, Event = e }).ToList();

            var joinedEvent = new List<GetByUserIdJoinedEventQueryResponse>();

            foreach (var item in favoriteEventIdToEventId)
            {
                joinedEvent.Add(new()
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
                    JoinedEvent = item.JoinedEvent,
                    FavoriteCount = _favoriteEventRepository.GetAllQuery(x => x.EventId == item.Event.Id).Count(),
                    JoinedCount = _joinedEventRepository.GetAllQuery(x => x.EventId == item.Event.Id).Count()
                });
            }
            return joinedEvent;
        }
    }
}
