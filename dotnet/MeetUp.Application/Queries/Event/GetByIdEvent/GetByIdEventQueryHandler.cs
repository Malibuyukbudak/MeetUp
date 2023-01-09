using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;
using MeetUp.Domain.Entities;

namespace MeetUp.Application.Queries.Event.GetByIdEvent
{
    public class GetByIdEventQueryHandler : IRequestHandler<GetByIdEventQuery, GetByIdEventResponse>
    {
        private readonly IGenericRepository<Domain.Entities.Event> _genericEventRepository;
        private readonly IGenericRepository<Domain.Entities.Categories> _categoriesRepository;
        private readonly IGenericRepository<FavoriteEvent> _favoriteEventRepository;
        private readonly IGenericRepository<JoinedEvent> _joinedEventRepository;
        private readonly IUserAccessor _userAccessor;
        private readonly IUnitOfWork _unitOfWork;
        public GetByIdEventQueryHandler(IUnitOfWork unitOfWork, IUserAccessor userAccessor = null)
        {
            _unitOfWork = unitOfWork;
            _genericEventRepository = _unitOfWork.GenericRepository<Domain.Entities.Event>();
            _categoriesRepository = _unitOfWork.GenericRepository<Domain.Entities.Categories>();
            _favoriteEventRepository = _unitOfWork.GenericRepository<FavoriteEvent>();
            _joinedEventRepository = _unitOfWork.GenericRepository<JoinedEvent>();
            _userAccessor = userAccessor;
        }
        public async Task<GetByIdEventResponse> Handle(GetByIdEventQuery request, CancellationToken cancellationToken)
        {
            var data = await _genericEventRepository.GetByIdAsync(request.Id);

            var result = new GetByIdEventResponse
            {
                Capacity = data.Capacity,
                City = data.City,
                Created = data.Created,
                State = data.State,
                Description = data.Description,
                Image = data.Image,
                Title = data.Title,
                Categories = await _categoriesRepository.GetByIdAsync(data.CategoryId),
                User = null,
                IsFavorite = _favoriteEventRepository.GetAllQuery(x => (x.UserId == _userAccessor.UserId) && (x.EventId == data.Id)).Count() > 0 ? true : false,
                IsJoined = _joinedEventRepository.GetAllQuery(x => (x.UserId == _userAccessor.UserId) && (x.EventId == data.Id)).Count() > 0 ? true : false,
            };


            return result;
        }
    }
}
