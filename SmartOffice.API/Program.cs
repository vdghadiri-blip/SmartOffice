using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SmartOffice.API.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});





// Controllers
builder.Services.AddControllers();


// Swagger
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(c =>
{

    c.AddSecurityDefinition("Bearer",
        new OpenApiSecurityScheme
        {

            Name = "Authorization",

            Type = SecuritySchemeType.Http,

            Scheme = "Bearer",

            BearerFormat = "JWT",

            In = ParameterLocation.Header,

            Description = "Enter JWT Token"

        });



    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {

            {

                new OpenApiSecurityScheme
                {

                    Reference =
                    new OpenApiReference
                    {

                        Type = ReferenceType.SecurityScheme,

                        Id = "Bearer"

                    }

                },

                new string[]{}

            }

        });

});



// Services

builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddSingleton<LetterService>();

builder.Services.AddSingleton<DepartmentService>();

builder.Services.AddSingleton<PasswordService>();

builder.Services.AddSingleton<JwtService>();




// JWT

builder.Services.AddAuthentication(
JwtBearerDefaults.AuthenticationScheme
)

.AddJwtBearer(options =>
{


    options.TokenValidationParameters =
    new TokenValidationParameters
    {


        ValidateIssuer = true,


        ValidateAudience = true,


        ValidateLifetime = true,


        ValidateIssuerSigningKey = true,



        ValidIssuer =
        builder.Configuration["Jwt:Issuer"],



        ValidAudience =
        builder.Configuration["Jwt:Audience"],



        IssuerSigningKey =
        new SymmetricSecurityKey(

            Encoding.UTF8.GetBytes(

                builder.Configuration["Jwt:Key"]!

            )

        )


    };


});

builder.Services.AddCors(options =>
{

    options.AddPolicy("react",

        policy =>
        {

            policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();

        });

});

// Authorization

builder.Services.AddAuthorization();



var app = builder.Build();


app.UseCors("ReactPolicy");

if (app.Environment.IsDevelopment())
{

    app.UseSwagger();

    app.UseSwaggerUI();

}




app.UseAuthentication();


app.UseAuthorization();

app.UseCors("react");

app.MapControllers();



app.Run();