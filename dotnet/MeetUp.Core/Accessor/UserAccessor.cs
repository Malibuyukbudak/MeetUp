using Microsoft.AspNetCore.Http;

namespace MeetUp.Core.Accessor
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public int UserId => Convert.ToInt32(httpContextAccessor.HttpContext?.User?.FindFirst("UserId").Value);

    }
}
