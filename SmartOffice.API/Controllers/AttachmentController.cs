using Microsoft.AspNetCore.Mvc;

namespace SmartOffice.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttachmentController : ControllerBase
    {

        [HttpGet("download/{fileName}")]
        public IActionResult Download(string fileName)
        {

            var path =
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "uploads",
                    fileName
                );



            if (!System.IO.File.Exists(path))
            {
                return NotFound("File not found");
            }



            var bytes =
                System.IO.File.ReadAllBytes(path);



            return File(
                bytes,
                "application/octet-stream",
                fileName
            );

        }

    }
}