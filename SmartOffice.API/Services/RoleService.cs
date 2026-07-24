using MongoDB.Bson;
using MongoDB.Driver;
using SmartOffice.API.Models;

namespace SmartOffice.API.Services
{
    public class RoleService
    {
        private readonly IMongoCollection<Role> _roles;

        public RoleService()
        {
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("SmartOfficeDB");

            _roles = database.GetCollection<Role>("Roles");
        }

        // دریافت همه نقش‌ها
        public List<Role> GetRoles()
        {
            return _roles
                .Find(x => true)
                .ToList();
        }

        // ایجاد نقش
        public void CreateRole(Role role)
        {
            role.Id = ObjectId.GenerateNewId().ToString();

            _roles.InsertOne(role);
        }

        // ویرایش نقش
        public void UpdateRole(string id, Role role)
        {
            role.Id = id;

            _roles.ReplaceOne(
                x => x.Id == id,
                role
            );
        }

        // حذف نقش
        public void DeleteRole(string id)
        {
            _roles.DeleteOne(
                x => x.Id == id
            );
        }
    }
}