namespace SmartOffice.API.Models
{
    public class UpdateLetterStatusRequest
    {

        public required string LetterId { get; set; }

        public required string Status { get; set; }

        public string? Description { get; set; }

    }
}