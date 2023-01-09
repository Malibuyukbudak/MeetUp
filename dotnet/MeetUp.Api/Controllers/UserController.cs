using MediatR;
using MeetUp.Application.Commands.User.CreateUser;
using MeetUp.Application.Commands.User.LoginUser;
using MeetUp.Application.Commands.User.LogoutUser;
using MeetUp.Application.Commands.User.RefreshToken;
using MeetUp.Core.DTOs;
using MeetUp.Core.Utilities.Result;
using MeetUp.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetUp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediatR;
        public UserController(IMediator mediatR)
        {
            _mediatR = mediatR;
        }
        [HttpPost("/api/User/Register")]
        public async Task<Result> Register([FromBody] CreateUserCommand createUserCommand)
        {
            var result = await _mediatR.Send(createUserCommand);
            if (result == true) return Result.Success("User successfully added");
            else return Result.Error("Error");
        }

        [HttpPost("/api/User/Login")]
        public async Task<Result<Token>> Login([FromBody] LoginUserCommand loginUserCommand)
        {
            var data = await _mediatR.Send(loginUserCommand);
            return Result<Token>.Success(data);
        }
        [HttpPost("/api/User/RefreshToken")]
        public async Task<Result<Token>> RefreshToken([FromForm] RefreshTokenLoginCommand refreshTokenLoginCommand)
        {
            var data = await _mediatR.Send(refreshTokenLoginCommand);
            return Result<Token>.Success(data);
        }
        [Authorize(AuthenticationSchemes = "user")]
        [HttpGet("/api/User/Logout")]
        public async Task<Result<bool>> Logout()
        {
            var data = await _mediatR.Send(new LogoutUserCommand());
            
            return Result<bool>.Success(data);
        }
    }
}
