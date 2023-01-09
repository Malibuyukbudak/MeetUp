using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Queries.Event.GetByUserIdEvent
{
    public class GetByUserIdEventQueryHandler : IRequestHandler<GetByUserIdEventQuery, List<GetByUserIdResponse>>
    {
        private readonly IGenericRepository<Domain.Entities.Event> _genericEventRepository;
        private readonly IGenericRepository<Domain.Entities.Categories> _genericCategoriesRepository;

        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserAccessor _userAccessor;
        public GetByUserIdEventQueryHandler(IUnitOfWork unitOfWork, IUserAccessor userAccessor)
        {
            _unitOfWork = unitOfWork;
            _genericEventRepository = _unitOfWork.GenericRepository<Domain.Entities.Event>();
            _genericCategoriesRepository = _unitOfWork.GenericRepository<Domain.Entities.Categories>();

            _userAccessor = userAccessor;
        }
        public async Task<List<GetByUserIdResponse>> Handle(GetByUserIdEventQuery request, CancellationToken cancellationToken)
        {
            var data = await _genericEventRepository.GetAll(x => x.UserId == _userAccessor.UserId);

            var result = new List<GetByUserIdResponse>();

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
                    Categories = await _genericCategoriesRepository.GetByIdAsync(item.CategoryId),
                    User = null,

                });
            }
            return result;
        }
    }
}
