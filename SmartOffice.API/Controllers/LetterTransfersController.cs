using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;


namespace SmartOffice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class LetterTransfersController : ControllerBase
    {

        private readonly LetterTransferService _service;


        public LetterTransfersController()
        {
            _service = new LetterTransferService();
        }



        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetTransfers());
        }



        [HttpPost]
        public IActionResult Create(LetterTransfer transfer)
        {
            _service.CreateTransfer(transfer);

            return Ok("Letter transferred");
        }

    }

}