using FluentValidation;

namespace MeetUp.Application.Commands.Event.CreateFavoriteEvent
{
    public class CreateFavoriteEventValidation : AbstractValidator<CreateFavoriteEventCommand>
    {
        public CreateFavoriteEventValidation()
        {
            RuleFor(x => x.FavoriteEvent.EventId).NotEmpty();
            RuleFor(x => x.FavoriteEvent.UserId).NotEmpty();
        }
    }
}
