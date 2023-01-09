using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;

namespace MeetUp.Application.Queries.Event.GetAllEvent
{
    public class GetAllEventQuery : IBaseQuery<List<GetAllEventQueryResponse>>, ICachableRequest
    {
    }
}
