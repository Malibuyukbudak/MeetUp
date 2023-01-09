using FluentValidation;

namespace MeetUp.Application.Commands.User.CreateUser
{
    public class CreateUserValidation : AbstractValidator<CreateUserCommand>
    {
        public CreateUserValidation()
        {
            //RuleFor(x => x.User.FirstName).Length(3, 30);
            //RuleFor(x => x.User.LastName).Length(3,30);
            //RuleFor(x => x.User.Email).EmailAddress();
            //RuleFor(x => x.User.Password).Length(8, 16);
            //RuleFor(x => x.User.Image).NotEmpty();
            //RuleFor(x => x.User.Telephone).NotEmpty();
            //RuleFor(x => x.User.Location).NotEmpty();
        }
    }
}
