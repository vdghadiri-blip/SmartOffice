using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;


namespace SmartOffice.API.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {


        private readonly IWebHostEnvironment _env;



        public FilesController(
            IWebHostEnvironment env)
        {

            _env = env;

        }






        // آپلود فایل
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(
            IFormFile file)
        {


            if (file == null || file.Length == 0)
            {

                return BadRequest(
                "File is empty");

            }



            var folder =
            Path.Combine(
                _env.ContentRootPath,
                "uploads"
            );



            if (!Directory.Exists(folder))
            {

                Directory.CreateDirectory(folder);

            }




            var fileName =
            Guid.NewGuid().ToString()
            +
            Path.GetExtension(file.FileName);



            var path =
            Path.Combine(
                folder,
                fileName
            );




            using (var stream =
            new FileStream(path, FileMode.Create))
            {

                await file.CopyToAsync(stream);

            }




            var result =
            new Attachment
            {

                FileName =
                file.FileName,


                FilePath =
                "uploads/" + fileName,


                FileSize =
                file.Length

            };



            return Ok(result);


        }



    }

}