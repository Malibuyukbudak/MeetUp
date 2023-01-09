namespace MeetUp.Domain.Entities
{
    public class Event : BaseEntity
    {
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public int Capacity { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Image { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }

    }
}
