using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Services;


namespace SmartOffice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class InboxController : ControllerBase
    {

        private readonly InboxService _service;


        public InboxController()
        {
            _service = new InboxService();
        }



        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            return Ok(_service.GetUserInbox(userId));
        }

    }

}