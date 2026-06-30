using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SmartOffice.API.Models;

namespace SmartOffice.API.Services
{
    public class JwtService
    {

        private readonly IConfiguration _config;


        public JwtService(IConfiguration config)
        {
            _config = config;
        }



        public string GenerateToken(User user)
        {

            // اطلاعاتی که داخل توکن ذخیره می‌کنیم
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.Name,
                    user.Username ?? ""
                ),

                new Claim(
                    ClaimTypes.Role,
                    user.Role ?? ""
                )
            };



            // کلید رمزنگاری
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _config["Jwt:Key"]!
                )
            );


            // امضای توکن
            var credentials =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );



            // ساخت توکن
            var token = new JwtSecurityToken(

                issuer: _config["Jwt:Issuer"],

                audience: _config["Jwt:Audience"],

                claims: claims,

                expires: DateTime.UtcNow.AddHours(8),

                signingCredentials: credentials
            );



            return new JwtSecurityTokenHandler()
                .WriteToken(token);

        }

    }
}