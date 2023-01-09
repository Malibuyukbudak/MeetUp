namespace MeetUp.Domain.Entities
{
    public class JoinedEvent : BaseEntity
    {
        public int EventId { get; set; }
        public int UserId { get; set; }
    }
}
