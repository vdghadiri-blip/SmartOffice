using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartOffice.API.Models;
using SmartOffice.API.Services;

namespace SmartOffice.API.Controllers
{
    /*********************************************************
     *
     * RolesController
     *
     * مسئول مدیریت نقش‌های سیستم
     *
     * امکانات:
     *
     * ✔ دریافت لیست نقش‌ها
     * ✔ ایجاد نقش
     * ✔ ویرایش نقش
     * ✔ حذف نقش
     *
     *********************************************************/

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class RolesController : ControllerBase
    {
        private readonly RoleService _service;

        public RolesController(RoleService service)
        {
            _service = service;
        }

        /************************************************
         *
         * دریافت همه نقش‌ها
         *
         * GET:
         * /api/Roles
         *
         ************************************************/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(
                _service.GetRoles()
            );
        }

        /************************************************
         *
         * ایجاد نقش جدید
         *
         * POST:
         * /api/Roles
         *
         ************************************************/
        [HttpPost]
        public IActionResult Create(Role role)
        {
            _service.CreateRole(role);

            return Ok(role);
        }

        /************************************************
         *
         * ویرایش نقش
         *
         * PUT:
         * /api/Roles/{id}
         *
         ************************************************/
        [HttpPut("{id}")]
        public IActionResult Update(
            string id,
            Role role)
        {
            _service.UpdateRole(id, role);

            return Ok(role);
        }

        /************************************************
         *
         * حذف نقش
         *
         * DELETE:
         * /api/Roles/{id}
         *
         ************************************************/
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _service.DeleteRole(id);

            return Ok("Role deleted");
        }
    }
}