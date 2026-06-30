using MongoDB.Bson;
using MongoDB.Driver;
using SmartOffice.API.Models;


namespace SmartOffice.API.Services
{

    public class DepartmentService
    {

        private readonly IMongoCollection<Department> _departments;



        public DepartmentService()
        {

            var client =
                new MongoClient("mongodb://localhost:27017");


            var database =
                client.GetDatabase("SmartOfficeDB");


            _departments =
                database.GetCollection<Department>("Departments");

        }





        public List<Department> GetDepartments()
        {

            return _departments
                .Find(x => true)
                .ToList();

        }





        public void CreateDepartment(
            Department department)
        {

            department.Id =
                ObjectId.GenerateNewId().ToString();


            _departments.InsertOne(department);

        }





        public void DeleteDepartment(
            string id)
        {

            _departments.DeleteOne(
                x => x.Id == id
            );

        }



    }

}