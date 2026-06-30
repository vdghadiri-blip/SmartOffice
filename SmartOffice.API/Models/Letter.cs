using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{

    public class Letter
    {


        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }



        // شماره دبیرخانه
        public string? LetterNumber { get; set; }



        public string? Subject { get; set; }



        public string? Content { get; set; }



        public string? SenderUserId { get; set; }



        public string? ReceiverUserId { get; set; }

        public string? DepartmentId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        // Urgent / Normal / Low
        public string? Priority { get; set; } = "Normal";



        // اداری، مالی، منابع انسانی و...
        public string? Category { get; set; }



        // Sent, Read, Approved, Rejected
        public string? Status { get; set; } = "Unread";



        // فایل پیوست
        public Attachment? Attachment { get; set; }






    }

}