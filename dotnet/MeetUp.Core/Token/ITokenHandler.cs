using System.Security.Claims;

namespace MeetUp.Core.Token
{
    public interface ITokenHandler
    {
        DTOs.Token CreateAccessToken(IEnumerable<Claim> claims);
        string CreateRefreshToken();
    }
}
