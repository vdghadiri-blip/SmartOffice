using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;

namespace SmartOffice.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class DepartmentsController : ControllerBase
    {

        private readonly DepartmentService _service;


        public DepartmentsController(
            DepartmentService service)
        {
            _service = service;
        }



        // دریافت همه دپارتمان‌ها
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(
                _service.GetDepartments()
            );
        }



        // ایجاد دپارتمان
        [HttpPost]
        public IActionResult Create(
            Department department)
        {

            _service.CreateDepartment(
                department
            );


            return Ok(
                department
            );
        }



        // ویرایش دپارتمان
        [HttpPut("{id}")]
        public IActionResult Update(
            string id,
            Department department)
        {

            _service.UpdateDepartment(
                id,
                department
            );


            return Ok(
                department
            );
        }



        // حذف دپارتمان
        [HttpDelete("{id}")]
        public IActionResult Delete(
            string id)
        {

            _service.DeleteDepartment(
                id
            );


            return Ok(
                "Department deleted"
            );
        }

    }
}