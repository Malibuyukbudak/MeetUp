using MeetUp.Application.Queries.Event.GetAllEvent;

namespace MeetUp.Application.Queries.Event.GetByUserIdJoinedEvent
{
    public class GetByUserIdJoinedEventQueryResponse
    {
        public GetAllEventQueryResponse Event { get; set; }
        public Domain.Entities.JoinedEvent JoinedEvent { get; set; }
        public int FavoriteCount { get; set; }
        public int JoinedCount { get; set; }
    }
}
