namespace MeetUp.Domain.Entities
{
    public class FavoriteEvent : BaseEntity
    {
        public int EventId { get; set; }
        public int UserId { get; set; }
    }
}
