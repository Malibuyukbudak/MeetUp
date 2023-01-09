using FluentValidation;

namespace MeetUp.Application.Commands.Event.CreateJoinEvent
{
    public class CreateJoinEventValidation : AbstractValidator<CreateJoinEventCommand>
    {
        public CreateJoinEventValidation()
        {
            RuleFor(x => x.JoinedEvent.EventId).NotEmpty();
            RuleFor(x => x.JoinedEvent.UserId).NotEmpty();
        }
    }
}
