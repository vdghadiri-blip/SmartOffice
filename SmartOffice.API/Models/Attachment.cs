using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{

    public class Attachment
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }


        public string FileName { get; set; } = "";


        public string FilePath { get; set; } = "";


        public long FileSize { get; set; }


        public string LetterId { get; set; } = "";


        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;


    }

}