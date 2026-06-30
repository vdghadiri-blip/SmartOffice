namespace SmartOffice.API.Models
{
    public class ForwardLetterRequest
    {

        public required string LetterId { get; set; }

        public required string ReceiverUsername { get; set; }

        public required string Description { get; set; }

    }
}