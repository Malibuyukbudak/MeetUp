using MediatR;
using MeetUp.Domain.Entities.Identity;

namespace MeetUp.Application.Queries.User.GetUser
{
    public class GetUserQuery : IRequest<AppUser>
    {

    }
}
