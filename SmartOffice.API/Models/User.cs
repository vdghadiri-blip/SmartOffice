using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{

    public class User
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }


        public string? FullName { get; set; }


        public string? Username { get; set; }


        public string? PasswordHash { get; set; }


        public string? Role { get; set; }


        public string? DepartmentId { get; set; }


        public bool IsActive { get; set; } = true;


    }

}