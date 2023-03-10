using MeetUp.Domain.Entities.Identity;

namespace MeetUp.Application.Queries.Event.GetByUserIdEvent
{
    public class GetByUserIdResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Domain.Entities.Categories Categories { get; set; }
        public int Capacity { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Image { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        public AppUser User { get; set; }

    }
}
