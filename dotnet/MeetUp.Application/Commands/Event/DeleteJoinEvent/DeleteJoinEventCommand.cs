using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;

namespace MeetUp.Application.Commands.Event.DeleteJoinEvent
{
    public class DeleteJoinEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public int Id;

    }
}
