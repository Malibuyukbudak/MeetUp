using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;

namespace MeetUp.Application.Commands.Event.CreateEvent
{
    public class CreateEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public Domain.Entities.Event Event;
    }
}
