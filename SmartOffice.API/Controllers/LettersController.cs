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



        public LettersController(
            LetterService service)
        {
            _service = service;
        }




        //====================================================
        // دریافت همه نامه ها
        // GET api/letters
        //====================================================

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(
                _service.GetLetters()
            );

        }







        //====================================================
        // ساخت نامه
        // POST api/letters
        //====================================================

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create(
            Letter letter)
        {

            _service.CreateLetter(letter);


            return Ok(
                "Letter created"
            );

        }








        //====================================================
        // ارسال نامه
        // POST api/letters/send
        //====================================================

        [HttpPost("send")]
        public IActionResult Send(
            SendLetterRequest request)
        {

            var sender =
                User.Identity?.Name;



            if (sender == null)
                return Unauthorized();



            _service.SendLetter(
                request,
                sender
            );



            return Ok(
                "Letter sent"
            );

        }








        //====================================================
        // Inbox
        // GET api/letters/inbox
        //====================================================

        [HttpGet("inbox")]
        public IActionResult Inbox()
        {

            var user =
                User.Identity?.Name;



            if (user == null)
                return Unauthorized();



            return Ok(
                _service.GetInbox(user)
            );

        }








        //====================================================
        // Sent
        // GET api/letters/sent
        //====================================================

        [HttpGet("sent")]
        public IActionResult Sent()
        {

            var user =
                User.Identity?.Name;



            if (user == null)
                return Unauthorized();



            return Ok(
                _service.GetSent(user)
            );

        }








        //====================================================
        // خواندن نامه
        // GET api/letters/read/{id}
        //====================================================

        [HttpGet("read/{id}")]
        public IActionResult Read(
            string id)
        {

            var letter =
                _service.ReadLetter(id);



            if (letter == null)
                return NotFound();



            return Ok(letter);

        }








        //====================================================
        // ارجاع نامه
        // POST api/letters/forward
        //====================================================

        [HttpPost("forward")]
        public IActionResult Forward(
            ForwardLetterRequest request)
        {

            var sender =
                User.Identity?.Name;



            if (sender == null)
                return Unauthorized();



            _service.ForwardLetter(
                request,
                sender
            );



            return Ok(
                "Letter forwarded"
            );

        }








        //====================================================
        // تغییر وضعیت نامه
        // POST api/letters/status
        //====================================================

        [HttpPost("status")]
        public IActionResult UpdateStatus(
            UpdateLetterStatusRequest request)
        {

            var user =
                User.Identity?.Name;



            if (user == null)
                return Unauthorized();



            _service.UpdateStatus(
                request,
                user
            );



            return Ok(
                "Status updated"
            );

        }








        //====================================================
        // نامه های دپارتمان
        // GET api/letters/department/{id}
        //====================================================

        [HttpGet("department/{id}")]
        public IActionResult Department(
            string id)
        {

            return Ok(
                _service.GetDepartmentLetters(id)
            );

        }








        //====================================================
        // تاریخچه نامه
        // GET api/letters/history/{id}
        //====================================================

        [HttpGet("history/{id}")]
        public IActionResult History(
            string id)
        {

            return Ok(
                _service.GetHistory(id)
            );

        }








        //====================================================
        // حذف نرم نامه
        // DELETE api/letters/{id}
        //====================================================

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(
            string id)
        {

            _service.DeleteLetter(id);


            return Ok(
                "Letter deleted"
            );

        }

    }

}