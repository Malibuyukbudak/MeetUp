using System.Text.Json.Serialization;

namespace MeetUp.Domain.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        [JsonIgnore]
        public bool IsDeleted { get; set; }
    }
}
