using MongoDB.Driver;
using SmartOffice.API.Models;

namespace SmartOffice.API.Services
{
    public class InboxService
    {
        private readonly IMongoCollection<LetterTransfer> _transfers;


        public InboxService()
        {
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("SmartOfficeDB");

            _transfers = database.GetCollection<LetterTransfer>("LetterTransfers");
        }



        public List<LetterTransfer> GetUserInbox(string userId)
        {
            return _transfers
                .Find(x => x.ToUserId == userId)
                .ToList();
        }

    }
}