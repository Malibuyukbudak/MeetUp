using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;
using MeetUp.Domain.Entities;

namespace MeetUp.Application.Commands.Event.CreateJoinEvent
{
    public class CreateJoinEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public JoinedEvent JoinedEvent;
    }
}
