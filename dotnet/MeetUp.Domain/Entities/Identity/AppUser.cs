using Microsoft.AspNetCore.Identity;

namespace MeetUp.Domain.Entities.Identity
{
    public class AppUser : IdentityUser<int> 
    {
        public string NameSurname { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenEndDate { get; set; }
    }
}
