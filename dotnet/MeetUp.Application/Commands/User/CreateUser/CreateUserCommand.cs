using MeetUp.Core.CQRS;

namespace MeetUp.Application.Commands.User.CreateUser
{
    public class CreateUserCommand : IBaseCommand<bool>
    {
        public string NameSurname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Password { get; set; }
    }
}
