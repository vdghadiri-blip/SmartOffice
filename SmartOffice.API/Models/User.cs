using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{
    public class User
    {
        // شناسه کاربر در MongoDB
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // نام و نام خانوادگی
        public string? FullName { get; set; }

        // نام کاربری
        public string? Username { get; set; }

        // رمز هش شده که داخل دیتابیس ذخیره می‌شود
        public string? PasswordHash { get; set; }

        // این فیلد فقط برای دریافت رمز از Frontend است.
        // در MongoDB ذخیره نمی‌شود.
        [BsonIgnore]
        public string? Password { get; set; }

        // نقش کاربر
        public string? Role { get; set; }

        // شناسه دپارتمان
        public string? DepartmentId { get; set; }

        // فعال یا غیرفعال بودن کاربر
        public bool IsActive { get; set; } = true;
    }
}