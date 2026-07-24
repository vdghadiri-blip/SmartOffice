using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{
    public class Role
    {
        // شناسه نقش
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // نام نقش
        public string? Name { get; set; }

        // توضیح نقش
        public string? Description { get; set; }

        // فعال یا غیرفعال بودن نقش
        public bool IsActive { get; set; } = true;
    }
}