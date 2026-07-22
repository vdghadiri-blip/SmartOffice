using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;


namespace SmartOffice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {


        private readonly MongoDbService _mongo;



        public UsersController(MongoDbService mongo)
        {

            _mongo = mongo;

        }





        [HttpGet]
        public IActionResult Get()
        {

            return Ok(
                _mongo.GetUsers()
            );

        }





        [HttpPost]
        public IActionResult Create(User user)
        {

            _mongo.CreateUser(user);


            return Ok("User created");

        }





        [HttpPut("{id}")]
        public IActionResult Update(
            string id,
            User user)
        {


            _mongo.UpdateUser(id, user);


            return Ok("User updated");

        }





        [HttpDelete("{id}")]
        public IActionResult Delete(
            string id)
        {


            _mongo.DeleteUser(id);


            return Ok("User deleted");

        }

        //اضافه کردن کاربر به واحد سازمانی
        [HttpGet("department/{departmentId}")]
        public IActionResult GetByDepartment(string departmentId)
        {

            return Ok(
                _mongo.GetUsersByDepartment(departmentId)
            );

        }

    }

}