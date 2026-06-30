using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Services;
using SmartOffice.API.Models;


namespace SmartOffice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly MongoDbService _mongo;

        private readonly JwtService _jwt;



        public AuthController(
            MongoDbService mongo,
            JwtService jwt
        )
        {
            _mongo = mongo;
            _jwt = jwt;
        }



        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {


            // پیدا کردن کاربر با Username
            var user = _mongo.GetUsers()
                .FirstOrDefault(x =>
                x.Username == request.Username);



            if (user == null)
            {
                return Unauthorized("User not found");
            }



            // بررسی رمز
            if (user.PasswordHash != request.Password)
            {
                return Unauthorized("Wrong password");
            }



            // ساخت Token
            var token = _jwt.GenerateToken(user);



            return Ok(new
            {

                message = "Login successful",

                username = user.Username,

                role = user.Role,

                token = token

            });

        }

    }

}