using MediatR;
using MeetUp.Core.Accessor;
using MeetUp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace MeetUp.Application.Queries.User.GetUser
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, AppUser>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public GetUserQueryHandler(IUserAccessor userAccessor, UserManager<AppUser> userManager)
        {
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<AppUser> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            return await _userManager.FindByIdAsync(_userAccessor.UserId.ToString());
        }
    }
}
