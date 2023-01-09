using MeetUp.Core.CQRS;

namespace MeetUp.Application.Queries.Event.GetByUserIdFavoriteEvent
{
    public class GetByUserIdFavoriteEventQuery : IBaseQuery<List<GetByUserIdFavoriteEventQueryResponse>>
    {
    }
}
