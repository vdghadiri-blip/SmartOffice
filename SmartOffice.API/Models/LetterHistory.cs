using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{

    public class LetterHistory
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }


        // شماره نامه اصلی
        public string? LetterId { get; set; }


        // کسی که عملیات انجام داده
        public string? UserId { get; set; }


        // نوع عملیات
        public string? Action { get; set; }


        // توضیحات
        public string? Description { get; set; }


        // زمان عملیات
        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;


    }

}