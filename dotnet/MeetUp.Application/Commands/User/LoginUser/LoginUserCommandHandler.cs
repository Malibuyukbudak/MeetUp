using MediatR;
using MeetUp.Core.DTOs;
using MeetUp.Core.Token;
using MeetUp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace MeetUp.Application.Commands.User.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, Token>
    {
        private readonly ITokenHandler _tokenHandler;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public LoginUserCommandHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }
        public async Task<Token> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.UsernameOrEmail);
            if (user == null) user = await _userManager.FindByNameAsync(request.UsernameOrEmail);

            if (user == null)
            {
                throw new Exception("Username or Wrong password!");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (result.Succeeded)
            {
                List<Claim> claims = new()
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, $"{user.UserName}")
                };
                var token = _tokenHandler.CreateAccessToken(claims);
                var refreshToken = _tokenHandler.CreateRefreshToken();
                token.RefreshToken = refreshToken;

                user.RefreshToken = refreshToken;
                user.RefreshTokenEndDate = DateTime.UtcNow.AddDays(1);

                return token;
            }
            else
            {
                throw new Exception("Username or Wrong password!");
            }
        }
    }
}
