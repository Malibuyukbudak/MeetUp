using MediatR;
using MeetUp.Data.Repository;
using MeetUp.Data.UnitOfWorks;

namespace MeetUp.Application.Queries.Categories.GetAllCategories
{
    public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, List<Domain.Entities.Categories>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Domain.Entities.Categories> _categoriesRepository;

        public GetAllCategoriesQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _categoriesRepository = _unitOfWork.GenericRepository<Domain.Entities.Categories>();
        }
        public async Task<List<Domain.Entities.Categories>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return await _categoriesRepository.GetAll();
        }
    }
}
