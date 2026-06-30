using MongoDB.Bson;
using MongoDB.Driver;
using SmartOffice.API.Models;


namespace SmartOffice.API.Services
{
    public class LetterTransferService
    {
        private readonly IMongoCollection<LetterTransfer> _transfers;


        public LetterTransferService()
        {
            var client = new MongoClient("mongodb://localhost:27017");

            var database = client.GetDatabase("SmartOfficeDB");

            _transfers = database.GetCollection<LetterTransfer>("LetterTransfers");
        }



        public List<LetterTransfer> GetTransfers()
        {
            return _transfers.Find(x => true).ToList();
        }



        public void CreateTransfer(LetterTransfer transfer)
        {
            transfer.Id = ObjectId.GenerateNewId().ToString();

            _transfers.InsertOne(transfer);
        }

    }
}