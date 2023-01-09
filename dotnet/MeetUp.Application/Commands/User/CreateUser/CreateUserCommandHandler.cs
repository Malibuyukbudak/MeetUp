using MediatR;
using MeetUp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace MeetUp.Application.Commands.User.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, bool>
    {
        private readonly UserManager<AppUser> _userManager;

        public CreateUserCommandHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {

            var result = await _userManager.CreateAsync(new()
            {
                NameSurname = request.NameSurname,
                UserName = request.Username,
                Email = request.Email,
                PhoneNumber = request.Telephone,
                RefreshToken = null
            }, request.Password);
            return result.Succeeded;
        }
    }
}
