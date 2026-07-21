using MongoDB.Bson;
using MongoDB.Driver;
using SmartOffice.API.Models;

namespace SmartOffice.API.Services
{
    public class MongoDbService
    {
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Letter> _letters;
        private readonly IMongoCollection<Department> _departments;

        private readonly PasswordService _password;

        public MongoDbService(PasswordService password)
        {
            _password = password;

            var client = new MongoClient(
                "mongodb://localhost:27017");

            var database = client.GetDatabase(
                "SmartOfficeDB");

            _users = database.GetCollection<User>("Users");

            _letters = database.GetCollection<Letter>("Letters");

            _departments = database.GetCollection<Department>("Departments");
        }

        //=========================================
        // Users
        //=========================================

        public List<User> GetUsers()
        {
            return _users
                .Find(x => true)
                .ToList();
        }

        public void CreateUser(User user)
        {
            // تولید شناسه جدید
            user.Id = ObjectId.GenerateNewId().ToString();

            // هش کردن رمز
            user.PasswordHash =
                _password.HashPassword(user.Password!);

            // رمز خام ذخیره نشود
            user.Password = null;

            _users.InsertOne(user);
        }

        public void UpdateUser(string id, User user)
        {
            // -------------------------------
            // گرفتن اطلاعات قبلی کاربر
            // -------------------------------
            var oldUser = _users.Find(x => x.Id == id).FirstOrDefault();

            if (oldUser == null)
                return;

            // -------------------------------
            // شناسه نباید تغییر کند
            // -------------------------------
            user.Id = id;

            // -------------------------------
            // اگر رمز وارد نشده باشد
            // رمز قبلی حفظ شود
            // -------------------------------
            if (string.IsNullOrWhiteSpace(user.Password))
            {
                user.PasswordHash = oldUser.PasswordHash;
            }
            else
            {
                user.PasswordHash =
                    _password.HashPassword(user.Password);
            }

            // رمز خام در دیتابیس ذخیره نشود
            user.Password = null;

            _users.ReplaceOne(
                x => x.Id == id,
                user);
        }

        public void DeleteUser(string id)
        {
            _users.DeleteOne(
                x => x.Id == id);
        }

        public List<User> GetUsersByDepartment(string departmentId)
        {
            return _users
                .Find(x => x.DepartmentId == departmentId)
                .ToList();
        }

        //=========================================
        // Letters
        //=========================================

        public List<Letter> GetLetters()
        {
            return _letters
                .Find(x => true)
                .ToList();
        }

        //=========================================
        // Departments
        //=========================================

        public List<Department> GetDepartments()
        {
            return _departments
                .Find(x => true)
                .ToList();
        }

        //=========================================
        // آخرین 5 نامه
        //=========================================

        public List<Letter> GetRecentLetters()
        {
            return _letters
                .Find(x => true)
                .SortByDescending(x => x.CreatedAt)
                .Limit(5)
                .ToList();
        }
    }
}