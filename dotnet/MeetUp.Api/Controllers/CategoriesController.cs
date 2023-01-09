using MediatR;
using MeetUp.Application.Queries.Categories.GetAllCategories;
using MeetUp.Core.Utilities.Result;
using MeetUp.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetUp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "user")]

    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediatR;
        public CategoriesController(IMediator mediatR)
        {
            _mediatR = mediatR;
        }
        [HttpGet]
        public async Task<Result<List<Categories>>> GetAllEvent()
        {
            var data = await _mediatR.Send(new GetAllCategoriesQuery());
            return Result<List<Categories>>.Success(data);
        }


    }
}
