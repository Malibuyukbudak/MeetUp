using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;

namespace MeetUp.Application.Commands.Event.DeleteFavoriteEvent
{
    public class DeleteFavoriteEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public int Id;

    }
}
