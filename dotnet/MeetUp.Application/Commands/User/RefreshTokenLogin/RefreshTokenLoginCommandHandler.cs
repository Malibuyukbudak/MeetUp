using MediatR;
using MeetUp.Core.DTOs;
using MeetUp.Core.Token;
using MeetUp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace MeetUp.Application.Commands.User.RefreshToken
{
    public class RefreshTokenLoginCommandHandler : IRequestHandler<RefreshTokenLoginCommand, Token>
    {
        private readonly ITokenHandler _tokenHandler;
        //private readonly IGenericRepository<Domain.Entities.User> _genericRepository;
        private readonly UserManager<AppUser> _userManager;

        public RefreshTokenLoginCommandHandler(/*IUnitOfWork unitOfWork,*/ ITokenHandler tokenHandler, UserManager<AppUser> userManager)
        {
            _tokenHandler = tokenHandler;
            //_genericRepository = unitOfWork.GenericRepository<Domain.Entities.User>();
            _userManager = userManager;
        }
        public async Task<Token> Handle(RefreshTokenLoginCommand request, CancellationToken cancellationToken)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.RefreshToken == request.RefreshToken);
            if (user != null && user?.RefreshTokenEndDate > DateTime.UtcNow)
            {
                List<Claim> claims = new(){
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
                throw new Exception("Not Found User Or Token is expired");

            }
            //var user = _genericRepository.GetWhere(x => x.RefreshToken == request.RefreshToken);
            //if (user != null && user?.Result?.RefreshTokenExpiryTime > DateTime.UtcNow)
            //{
            //    List<Claim> claims = new(){
            //    new Claim("UserId", user.Id.ToString()),
            //    new Claim(ClaimTypes.Name, $"{user.Result.FirstName} {user.Result.LastName}")
            //    };
            //    var token = _tokenHandler.CreateAccessToken(claims);
            //    var refreshToken = _tokenHandler.CreateRefreshToken();
            //    token.RefreshToken = refreshToken;
            //    user.Result.RefreshToken = refreshToken;
            //    user.Result.RefreshTokenExpiryTime = DateTime.UtcNow.AddSeconds(240);
            //    return token;
            //}
            //else
            //{
            //    throw new Exception("Not Found User Or Token is expired");
            //}
        }
    }
}
