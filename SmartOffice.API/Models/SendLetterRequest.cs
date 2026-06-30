namespace SmartOffice.API.Models
{

    public class SendLetterRequest
    {

        public string? Subject { get; set; }


        public string? Content { get; set; }


        public string? ReceiverUsername { get; set; }


        public string? DepartmentId { get; set; }


        public Attachment? Attachment { get; set; }

    }

}