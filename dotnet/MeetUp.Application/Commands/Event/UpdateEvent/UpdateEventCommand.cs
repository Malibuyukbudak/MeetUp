using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;


namespace MeetUp.Application.Commands.Event.UpdateEvent
{
    public class UpdateEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public int Id;
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public int Capacity { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Image { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
    }
}
