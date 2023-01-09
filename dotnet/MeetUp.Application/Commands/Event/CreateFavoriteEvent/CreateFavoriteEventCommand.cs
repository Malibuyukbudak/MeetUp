using MeetUp.Core.Caching;
using MeetUp.Core.CQRS;

namespace MeetUp.Application.Commands.Event.CreateFavoriteEvent
{
    public class CreateFavoriteEventCommand : IBaseCommand<bool>, ICachableRequest
    {
        public Domain.Entities.FavoriteEvent FavoriteEvent;
    }
}
