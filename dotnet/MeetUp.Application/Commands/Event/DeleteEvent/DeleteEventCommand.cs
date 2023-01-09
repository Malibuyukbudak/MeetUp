using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;

namespace MeetUp.Application.Commands.Event.DeleteEvent
{
    public class DeleteEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public int Id;
    }
}
