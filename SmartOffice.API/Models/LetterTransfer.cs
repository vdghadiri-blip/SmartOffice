using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{
    public class LetterTransfer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }


        public string? LetterId { get; set; }


        public string? FromUserId { get; set; }


        public string? ToUserId { get; set; }


        public string? Description { get; set; }


        public string Status { get; set; } = "Sent";


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}