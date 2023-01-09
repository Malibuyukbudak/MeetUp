using MediatR;
using MeetUp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace MeetUp.Application.Commands.User.LogoutUser
{
    internal class LogoutUserCommandHandler : IRequestHandler<LogoutUserCommand, bool>
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LogoutUserCommandHandler(SignInManager<AppUser> signInManager, IHttpContextAccessor httpContextAccessor)
        {
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<bool> Handle(LogoutUserCommand request, CancellationToken cancellationToken)
        {
            await _signInManager.SignOutAsync();
            //await _httpContextAccessor.HttpContext.Authentication.SignOutAsync("user");
            return true;
        }
    }
}
