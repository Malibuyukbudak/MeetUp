using FluentValidation;

namespace MeetUp.Application.Commands.Event.CreateEvent
{
    public class CreateEventValidator : AbstractValidator<CreateEventCommand>
    {
        public CreateEventValidator()
        {
            RuleFor(x => x.Event.Title).Length(3, 30);
            RuleFor(x => x.Event.CategoryId).NotEmpty();
            RuleFor(x => x.Event.Capacity).NotEmpty();
            RuleFor(x => x.Event.City).Length(3, 30);
            RuleFor(x => x.Event.State).Length(3, 30);
            RuleFor(x => x.Event.Image).NotEmpty();
            RuleFor(x => x.Event.Description).Length(20, 250);
            RuleFor(x => x.Event.Created).NotEmpty();
            RuleFor(x => x.Event.UserId).NotEmpty();
        }
    }
}
