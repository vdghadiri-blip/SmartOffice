using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartOffice.API.Models
{
    public class Letter
    {
        // شناسه نامه
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // شماره دبیرخانه
        public string? LetterNumber { get; set; }

        // موضوع نامه
        public string? Subject { get; set; }

        // متن نامه
        public string? Content { get; set; }

        // شناسه فرستنده
        public string? SenderUserId { get; set; }

        // شناسه گیرنده
        public string? ReceiverUserId { get; set; }

        // شناسه دپارتمان
        public string? DepartmentId { get; set; }

        // تاریخ ایجاد
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // تاریخ آخرین ویرایش
        public DateTime? UpdatedAt { get; set; }

        // تاریخ سررسید
        public DateTime? DueDate { get; set; }

        // اولویت
        // Low / Normal / High / Urgent
        public string? Priority { get; set; } = "Normal";

        // دسته‌بندی
        public string? Category { get; set; }

        // وضعیت نامه
        // Draft / Sent / Read / Approved / Rejected / Archived
        public string? Status { get; set; } = "Draft";

        // برچسب‌ها
        // برچسب‌ها
        public string[] Tags { get; set; } = Array.Empty<string>();
        // حذف نرم
        public bool IsDeleted { get; set; }

        // تاریخ حذف
        public DateTime? DeletedAt { get; set; }

        // فایل پیوست
        public Attachment? Attachment { get; set; }
    }
}