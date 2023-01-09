using MeetUp.Application.Queries.Event.GetAllEvent;

namespace MeetUp.Application.Queries.Event.GetByUserIdFavoriteEvent
{
    public class GetByUserIdFavoriteEventQueryResponse
    {
        public GetAllEventQueryResponse Event { get; set; }
        public int Id { get; set; }
        public int FavoriteCount { get; set; }
        public int JoinedCount { get; set; }

    }
}
