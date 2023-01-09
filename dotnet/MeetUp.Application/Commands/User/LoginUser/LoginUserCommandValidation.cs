using FluentValidation;

namespace MeetUp.Application.Commands.User.LoginUser
{
    public class LoginUserCommandValidation : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidation()
        {
            //RuleFor(x => x.Email).EmailAddress();
            //RuleFor(x => x.Password).Length(8, 16);
        }
    }
}
