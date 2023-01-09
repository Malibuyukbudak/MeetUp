using MeetUp.Core.CQRS;
using MeetUp.Core.DTOs;

namespace MeetUp.Application.Commands.User.LoginUser
{
    public class LoginUserCommand : IBaseCommand<Token>
    {
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }
    }
}
