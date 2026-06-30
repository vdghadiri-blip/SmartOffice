using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;


namespace SmartOffice.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class DepartmentsController : ControllerBase
    {


        private readonly DepartmentService _service;



        public DepartmentsController(
            DepartmentService service)
        {

            _service = service;

        }





        [HttpGet]
        public IActionResult Get()
        {

            return Ok(
                _service.GetDepartments()
            );

        }






        [HttpPost]
        public IActionResult Create(
            Department department)
        {


            _service.CreateDepartment(
                department
            );


            return Ok("Department created");

        }




        [HttpDelete("{id}")]
        public IActionResult Delete(
            string id)
        {


            _service.DeleteDepartment(
                id
            );


            return Ok("Department deleted");

        }



    }

}