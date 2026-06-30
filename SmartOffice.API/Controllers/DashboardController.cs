using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;

namespace SmartOffice.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly MongoDbService _mongo;

    public DashboardController(MongoDbService mongo)
    {
        _mongo = mongo;
    }



    [HttpGet("stats")]
    public IActionResult GetStats()
    {
        DashboardStats stats = new DashboardStats
        {
            Users = _mongo.GetUsers().Count,

            Letters = _mongo.GetLetters().Count,

            Departments = _mongo.GetDepartments().Count
        };

        return Ok(stats);
    }

    //گرفتن 5 یوزر
    [HttpGet("recentletters")]

    public IActionResult GetRecentLetters()
    {
        return Ok(
            _mongo.GetRecentLetters()
        );
    }
}

