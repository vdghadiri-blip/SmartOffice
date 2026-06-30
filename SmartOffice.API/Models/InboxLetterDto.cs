namespace SmartOffice.API.Models
{

    public class InboxLetterDto
    {


        public string? Id { get; set; }


        public string? Subject { get; set; }


        public string? Content { get; set; }


        public string? FromUser { get; set; }


        public string? ToUser { get; set; }


        public string? Status { get; set; }


        public DateTime CreatedAt { get; set; }


    }

}