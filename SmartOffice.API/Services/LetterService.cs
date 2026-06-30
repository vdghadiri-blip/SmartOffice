using MongoDB.Bson;
using MongoDB.Driver;
using SmartOffice.API.Models;


namespace SmartOffice.API.Services
{

    public class LetterService
    {

        private readonly IMongoCollection<Letter> _letters;

        private readonly IMongoCollection<LetterTransfer> _transfers;

        private readonly IMongoCollection<LetterHistory> _history;



        // اتصال به MongoDB
        public LetterService()
        {

            var client =
                new MongoClient(
                "mongodb://localhost:27017");


            var database =
                client.GetDatabase(
                "SmartOfficeDB");


            _letters =
                database.GetCollection<Letter>(
                "Letters");


            _transfers =
                database.GetCollection<LetterTransfer>(
                "LetterTransfers");


            _history =
                database.GetCollection<LetterHistory>(
                "LetterHistories");

        }





        // گرفتن Inbox کاربر
        public List<InboxLetterDto> GetInbox(string userId)
        {

            var transfers =
                _transfers
                .Find(x => x.ToUserId == userId)
                .ToList();


            var result =
                new List<InboxLetterDto>();


            foreach (var item in transfers)
            {

                var letter =
                    _letters
                    .Find(x => x.Id == item.LetterId)
                    .FirstOrDefault();


                if (letter != null)
                {

                    result.Add(new InboxLetterDto
                    {

                        Id = letter.Id,

                        Subject = letter.Subject,

                        Content = letter.Content,

                        FromUser = item.FromUserId,

                        ToUser = item.ToUserId,

                        Status = item.Status,

                        CreatedAt = item.CreatedAt

                    });

                }

            }


            return result;

        }





        // گرفتن همه نامه ها
        public List<Letter> GetLetters()
        {

            return _letters
            .Find(x => true)
            .ToList();

        }





        // ساخت نامه دستی
        public void CreateLetter(Letter letter)
        {


            letter.Id =
            ObjectId.GenerateNewId()
            .ToString();


            letter.LetterNumber =
            GenerateLetterNumber();



            _letters.InsertOne(letter);



            AddHistory(
                letter.Id,
                letter.SenderUserId!,
                "Created",
                "ساخت نامه"
            );

        }





        // خواندن نامه
        public Letter? ReadLetter(string id)
        {

            var letter =
            _letters
            .Find(x => x.Id == id)
            .FirstOrDefault();



            if (letter == null)
                return null;



            letter.Status = "Read";



            _letters.ReplaceOne(
                x => x.Id == id,
                letter);



            AddHistory(
                id,
                letter.ReceiverUserId!,
                "Read",
                "خواندن نامه"
            );



            return letter;

        }







        // فوروارد نامه
        public void ForwardLetter(
            ForwardLetterRequest request,
            string senderUsername)
        {


            if (string.IsNullOrEmpty(request.ReceiverUsername))
            {
                throw new Exception(
                "گیرنده مشخص نشده");
            }



            var transfer =
            new LetterTransfer
            {


                Id =
                ObjectId.GenerateNewId()
                .ToString(),


                LetterId =
                request.LetterId,


                FromUserId =
                senderUsername,


                ToUserId =
                request.ReceiverUsername,


                Description =
                request.Description,


                Status =
                "Forwarded",


                CreatedAt =
                DateTime.UtcNow

            };



            _transfers.InsertOne(transfer);



            AddHistory(
                request.LetterId,
                senderUsername,
                "Forward",
                "ارجاع نامه"
            );

        }








        // نامه های یک دپارتمان
        public List<Letter> GetDepartmentLetters(
            string departmentId)
        {

            return _letters
            .Find(x =>
            x.DepartmentId == departmentId)
            .ToList();


        }








        // نامه های ارسال شده
        public List<InboxLetterDto> GetSent(
            string userId)
        {

            var transfers =
            _transfers
            .Find(x => x.FromUserId == userId)
            .ToList();


            var result =
            new List<InboxLetterDto>();


            foreach (var item in transfers)
            {

                var letter =
                _letters
                .Find(x => x.Id == item.LetterId)
                .FirstOrDefault();



                if (letter != null)
                {

                    result.Add(new InboxLetterDto
                    {

                        Id = letter.Id,

                        Subject = letter.Subject,

                        Content = letter.Content,

                        FromUser = item.FromUserId,

                        ToUser = item.ToUserId,

                        Status = item.Status,

                        CreatedAt = item.CreatedAt

                    });

                }

            }


            return result;

        }









        // ارسال نامه اصلی
        public void SendLetter(
            SendLetterRequest request,
            string senderUsername)
        {


            if (string.IsNullOrEmpty(request.ReceiverUsername))
            {
                throw new Exception(
                    "گیرنده نامه مشخص نشده");
            }



            var letter =
            new Letter
            {

                LetterNumber =
                GenerateLetterNumber(),


                Subject =
                request.Subject,


                Content =
                request.Content,


                SenderUserId =
                senderUsername,


                ReceiverUserId =
                request.ReceiverUsername,


                DepartmentId =
                request.DepartmentId,


                // پیوست نامه
                Attachment =
                request.Attachment,


                Status =
                "Unread"

            };



            letter.Id =
            ObjectId.GenerateNewId()
            .ToString();




            _letters.InsertOne(letter);




            AddHistory(
                letter.Id,
                senderUsername,
                "Created",
                "ارسال نامه"
            );





            var transfer =
            new LetterTransfer
            {

                Id =
                ObjectId.GenerateNewId()
                .ToString(),


                LetterId =
                letter.Id,


                FromUserId =
                senderUsername,


                ToUserId =
                request.ReceiverUsername,


                Description =
                "ارسال نامه",


                Status =
                "Sent"

            };



            _transfers.InsertOne(transfer);


        }






        // تغییر وضعیت تایید یا رد
        public void UpdateStatus(
            UpdateLetterStatusRequest request,
            string username)
        {


            var transfer =
            _transfers
            .Find(x =>
            x.LetterId == request.LetterId &&
            x.ToUserId == username)
            .FirstOrDefault();



            if (transfer == null)
                return;



            transfer.Status =
            request.Status;



            transfer.Description =
            request.Description ?? "";



            _transfers.ReplaceOne(
            x => x.Id == transfer.Id,
            transfer);



            AddHistory(
            request.LetterId,
            username,
            request.Status,
            "تغییر وضعیت نامه");


        }








        // تولید شماره نامه
        private string GenerateLetterNumber()
        {

            var count =
            _letters.CountDocuments(x => true);


            return
            $"{DateTime.Now.Year}-{count + 1:D6}";

        }







        // ثبت تاریخچه
        private void AddHistory(
            string letterId,
            string user,
            string action,
            string description)
        {


            var history =
            new LetterHistory
            {


                Id =
                ObjectId.GenerateNewId()
                .ToString(),


                LetterId =
                letterId,


                UserId =
                user,


                Action =
                action,


                Description =
                description,


                CreatedAt =
                DateTime.UtcNow

            };



            _history.InsertOne(history);

        }
        public List<LetterHistory> GetHistory(
    string letterId)
        {

            return _history
                .Find(x => x.LetterId == letterId)
                .SortBy(x => x.CreatedAt)
                .ToList();

        }

    }

}