using MeetUp.Core.CQRS;
using MeetUp.Core.DTOs;

namespace MeetUp.Application.Commands.User.RefreshToken
{
    public class RefreshTokenLoginCommand : IBaseCommand<Token>
    {
        public string RefreshToken { get; set; }
    }
}
