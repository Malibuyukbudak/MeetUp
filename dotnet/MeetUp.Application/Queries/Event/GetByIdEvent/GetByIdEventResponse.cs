using MeetUp.Domain.Entities.Identity;

namespace MeetUp.Application.Queries.Event.GetByIdEvent
{
    public class GetByIdEventResponse
    {
        public string Title { get; set; }
        public Domain.Entities.Categories Categories { get; set; }
        public int Capacity { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Image { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        public AppUser User { get; set; }
        public bool IsFavorite { get; set; }
        public bool IsJoined { get; set; }

    }
}
