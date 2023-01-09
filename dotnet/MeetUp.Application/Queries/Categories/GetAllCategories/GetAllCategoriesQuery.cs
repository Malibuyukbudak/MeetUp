using MeetUp.Core.CQRS;

namespace MeetUp.Application.Queries.Categories.GetAllCategories
{
    public class GetAllCategoriesQuery : IBaseQuery<List<Domain.Entities.Categories>>
    {
    }
}
