using MediatR;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using MeetUp.Domain.Entities;

namespace MeetUp.Application.Queries.Event.GetAllEvent
{
    public class GetAllEventQueryHandler : IRequestHandler<GetAllEventQuery, List<GetAllEventQueryResponse>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Domain.Entities.Event> _eventRepository;
        private readonly IGenericRepository<Domain.Entities.Categories> _categoriesRepository;
        private readonly IGenericRepository<FavoriteEvent> _favoriteEventRepository;
        private readonly IGenericRepository<JoinedEvent> _joinedEventRepository;
        public GetAllEventQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _eventRepository = _unitOfWork.GenericRepository<Domain.Entities.Event>();
            _categoriesRepository = _unitOfWork.GenericRepository<Domain.Entities.Categories>();
            _favoriteEventRepository = _unitOfWork.GenericRepository<FavoriteEvent>();
            _joinedEventRepository = _unitOfWork.GenericRepository<JoinedEvent>();
        }
        public async Task<List<GetAllEventQueryResponse>> Handle(GetAllEventQuery request, CancellationToken cancellationToken)
        {
            var data = await _eventRepository.GetAll();
            var result = new List<GetAllEventQueryResponse>();

            foreach (var item in data)
            {
                result.Add(new()
                {
                    Id = item.Id,
                    Capacity = item.Capacity,
                    City = item.City,
                    Created = item.Created,
                    State = item.State,
                    Description = item.Description,
                    Image = item.Image,
                    Title = item.Title,
                    Categories = await _categoriesRepository.GetByIdAsync(item.CategoryId),
                    User = null,
                    FavoriteCount = _favoriteEventRepository.GetAllQuery(x => x.EventId == item.Id).Count(),
                    JoinedCount = _joinedEventRepository.GetAllQuery(x => x.EventId == item.Id).Count()
                });
            }
            return result;
        }
    }
}
