using MediatR;
using MeetUp.Application.Commands.Event.CreateEvent;
using MeetUp.Application.Commands.Event.CreateFavoriteEvent;
using MeetUp.Application.Commands.Event.CreateJoinEvent;
using MeetUp.Application.Commands.Event.DeleteEvent;
using MeetUp.Application.Commands.Event.DeleteFavoriteEvent;
using MeetUp.Application.Commands.Event.DeleteJoinEvent;
using MeetUp.Application.Commands.Event.UpdateEvent;
using MeetUp.Application.Queries.Event.GetAllEvent;
using MeetUp.Application.Queries.Event.GetByIdEvent;
using MeetUp.Application.Queries.Event.GetByUserIdEvent;
using MeetUp.Application.Queries.Event.GetByUserIdFavoriteEvent;
using MeetUp.Application.Queries.Event.GetByUserIdJoinedEvent;
using MeetUp.Core.Utilities.Result;
using MeetUp.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetUp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "user")]

    public class EventController : ControllerBase
    {
        private readonly IMediator _mediatR;
        public EventController(IMediator mediatR)
        {
            _mediatR = mediatR;
        }

        [HttpPost]
        public async Task<Result> CreateEvent([FromBody] Event eventProp)
        {
            var result = await _mediatR.Send(new CreateEventCommand { Event = eventProp });
            if (result == true) return Result.Success("Event successfully added");
            else return Result.Error("Error");
        }

        //[HttpPut("{id}")]
        //public async Task<Result> UpdateEvent([FromBody] Event eventProp, int id)
        //{
        //    var result = await _mediatR.Send(new UpdateEventCommand { Event = eventProp, Id = id });
        //    if (result == true) return Result.Success("Event successfully updated");
        //    else return Result.Error("Error");
        //}

        [HttpDelete("{id}")]
        public async Task<Result> DeleteEvent(int id)
        {
            var result = await _mediatR.Send(new DeleteEventCommand { Id = id });
            if (result == true) return Result.Success("Event successfully deleted");
            else return Result.Error("Error");
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<Result<List<GetAllEventQueryResponse>>> GetAllEvent()
        {
            var data = await _mediatR.Send(new GetAllEventQuery());
            return Result<List<GetAllEventQueryResponse>>.Success(data);
        }

        [HttpGet("user/data")]
        public async Task<Result<List<GetByUserIdResponse>>> GetUserEvent()
        {
            var data = await _mediatR.Send(new GetByUserIdEventQuery());
            return Result<List<GetByUserIdResponse>>.Success(data);
        }

        [HttpGet("{id}")]
        public async Task<Result<GetByIdEventResponse>> GetEvent(int id)
        {
            var data = await _mediatR.Send(new GetByIdEventQuery { Id = id });
            return Result<GetByIdEventResponse>.Success(data);
        }

        [HttpPost("/api/Event/Favorite")]
        public async Task<Result> FavoriteEvent([FromBody] FavoriteEvent favoriteEvent)
        {
            var result = await _mediatR.Send(new CreateFavoriteEventCommand { FavoriteEvent = favoriteEvent });
            if (result == true) return Result.Success("Event successfully favorites added");
            else return Result.Error("Error");
        }

        [HttpGet("user/FavoriteEvent")]
        public async Task<Result<List<GetByUserIdFavoriteEventQueryResponse>>> GetFavoriteEvent()
        {
            var data = await _mediatR.Send(new GetByUserIdFavoriteEventQuery());
            return Result<List<GetByUserIdFavoriteEventQueryResponse>>.Success(data);
        }

        [HttpDelete("FavoriteEvent/{id}")]
        public async Task<Result> DeleteFavoriteEvent(int id)
        {
            var result = await _mediatR.Send(new DeleteFavoriteEventCommand { Id = id });
            if (result == true) return Result.Success("Event successfully favorites deleted");
            else return Result.Error("Error");
        }

        [HttpDelete("JoinedEvent/{id}")]
        public async Task<Result> DeleteJoinedEvent(int id)
        {
            var result = await _mediatR.Send(new DeleteJoinEventCommand { Id = id });
            if (result == true) return Result.Success("Event successfully joined deleted");
            else return Result.Error("Error");
        }

        [HttpPost("/api/Event/Join")]
        public async Task<Result> JoinEvent([FromBody] JoinedEvent joinedEvent)
        {
            var result = await _mediatR.Send(new CreateJoinEventCommand { JoinedEvent = joinedEvent });
            if (result == true) return Result.Success("Event succesfully join");
            else return Result.Error("Error");
        }

        [HttpGet("user/JoinedEvent")]
        public async Task<Result<List<GetByUserIdJoinedEventQueryResponse>>> GetJoinedEvent()
        {
            var data = await _mediatR.Send(new GetByUserIdJoinedEventQuery());
            return Result<List<GetByUserIdJoinedEventQueryResponse>>.Success(data);
        }

    }
}
