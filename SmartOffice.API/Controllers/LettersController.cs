using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;


namespace SmartOffice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LettersController : ControllerBase
    {


        private readonly LetterService _service;



        public LettersController(LetterService service)
        {

            _service = service;

        }





        [HttpPost("send")]
        public IActionResult Send(SendLetterRequest request)
        {


            var sender = User.Identity?.Name;



            if (sender == null)
            {

                return Unauthorized();

            }



            _service.SendLetter(
                request,
                sender
            );



            return Ok("Letter sent");

        }
        //ارجاع گردش نامه
        [HttpPost("forward")]
        public IActionResult Forward(
    ForwardLetterRequest request)
        {


            var sender =
                User.Identity?.Name;


            if (sender == null)
            {
                return Unauthorized();
            }


            _service.ForwardLetter(
                request,
                sender
            );


            return Ok("Letter forwarded");

        }



        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_service.GetLetters());

        }





        [HttpPost]
        public IActionResult Create(Letter letter)
        {


            _service.CreateLetter(letter);


            return Ok("Letter created");

        }

        [HttpGet("read/{id}")]
        public IActionResult Read(string id)
        {
            var letter = _service.ReadLetter(id);

            if (letter == null)
            {
                return NotFound();
            }

            return Ok(letter);
        }

        [HttpGet("sent")]
        public IActionResult Sent()
        {

            var user =
                User.Identity?.Name;


            if (user == null)
            {
                return Unauthorized();
            }


            return Ok(
                _service.GetSent(user)
            );


        }


        [HttpGet("inbox")]
        public IActionResult Inbox()
        {


            var userId = User.Identity?.Name;


            if (userId == null)
            {
                return Unauthorized();
            }


            var letters = _service.GetInbox(userId);


            return Ok(letters);

        }
        [HttpGet("department/{id}")]
        public IActionResult DepartmentLetters(string id)
        {

            return Ok(
                _service.GetDepartmentLetters(id)
            );

        }
        //رد یا تایید نامه
        [HttpPost("status")]
        public IActionResult UpdateStatus(
    UpdateLetterStatusRequest request)
        {


            var user =
                User.Identity?.Name;


            if (user == null)
            {
                return Unauthorized();
            }


            _service.UpdateStatus(
                request,
                user
            );


            return Ok("Status updated");

        }
        [HttpGet("history/{letterId}")]
        public IActionResult History(
    string letterId)
        {

            return Ok(
                _service.GetHistory(letterId)
            );

        }

    }

}