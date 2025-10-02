const { MongoClient } = require("mongodb");

//this link for connect with mongodb atlas
//const uri = "mongodb+srv://mehedi:mehedi67667@cluster0.0dhfpwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//this link for mongodb local server
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2";


const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      console.log("✅ MongoDB Connected");
      db = client.db("school"); // your database name
    }
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// ----------------- INSERT ONE STUDENT -----------------
async function insertOneStudent() {
  const students = db.collection("student");

  await students.insertOne({
    name: "mehedi hasan",
    role: "employe",
    id: "2",
    city: "dhaka",
  });

  console.log("✅ Student inserted successfully!");
}

// ----------------- DELETE ONE STUDENT -----------------
async function deleteOneStudent(studentId) {
  const students = db.collection("student");

  const result = await students.deleteOne({ id: studentId });

  if (result.deletedCount === 1) {
    console.log(`🗑️ Student with id=${studentId} deleted successfully!`);
  } else {
    console.log(`⚠️ No student found with id=${studentId}`);
  }
}

// ----------------- DELETE ALL STUDENTS -----------------
async function deleteAllStudents() {
  const students = db.collection("student");

  const result = await students.deleteMany({}); // empty filter deletes all

  console.log(`🗑️ ${result.deletedCount} students deleted from the collection!`);
}

// ----------------- FIND ONE STUDENT -----------------
async function findOneStudent(studentId) {
  const students = db.collection("student");

  const student = await students.findOne({ id: studentId });

  if (student) {
    console.log("🔍 Student found:", student);
  } else {
    console.log(`⚠️ No student found with id=${studentId}`);
  }
}

// ----------------- FIND ALL STUDENTS -----------------
async function findAllStudents() {
  const students = db.collection("student");

  const allStudents = await students.find({}).toArray();

  if (allStudents.length > 0) {
    console.log("🔍 All students:");
    console.table(allStudents); // nice table format in console
  } else {
    console.log("⚠️ No students in the collection.");
  }
}

//use prjection for finding spasicip colums/data
async function findAllStudentIds() {
  const students = db.collection("student");

  const filter = {}; // no filter, get all documents
  const projection = { projection: { class: 1, id: 1, _id: 0 } }; // include class and id, hide _id

  const result = await students.find(filter, projection).toArray();

  console.log("🔍 All student IDs and class:");
  console.table(result);
}


async function findQuery(params) {
    const students=db.collection("student"); 

    const query={role:"tester",city:"comilla"}; 
      const result = await students.find(query).toArray();
      console.table(result); 

}


//show only three data from data base beacuse limit is 3. 
async function findAllDataLimit() {
  const students = db.collection("student");

  // Limit the result to 3 documents
  const result = await students.find().limit(3).toArray();

  console.log("🔍 Limited student data:");
  console.table(result);
}


async function findDataBySort(params) {
    const students=db.collection("student"); 
    
    //it sort the data decending order according to id 
    var sortPattern={id:-1}; 
    const result=await students.find().sort(sortPattern).toArray();
    console.log(result);  
}


async function updateOneData() {
  const students = db.collection("student");

  // Query: find student with id = "3"
  const myQuery = { id: "3" };

  // New values (use $set to update specific fields)
  const newValues = { $set: { name: "Hamidur Rahman", role: "employee", city: "maymanshing" } };

  try {
    const result = await students.updateOne(myQuery, newValues);
    console.log("✅ Update Result:", result);
  } catch (err) {
    console.error("❌ Update failed:", err);
  }
}


async function createMyCollection() {
  try {
    const result = await db.createCollection("teacher");
    console.log("✅ Collection created:", result.collectionName);
  } catch (err) {
    console.error("❌ Error creating collection:", err);
  }
}


async function deleteCollection() {
  try {
    const result = await db.dropCollection("teacher");
    console.log("✅ Collection deleted:", result);
  } catch (err) {
    console.error("❌ Error deleting collection:", err);
  }
}


// ----------------- MAIN -----------------
async function main() {
  await connectDB();

  // Insert a student
  await insertOneStudent();

  // Show all students
  //await findAllStudents();

  // Find a single student
  //await findOneStudent("1");

  // Delete a student by id
  //await deleteOneStudent("011221");

  // Show all students after deletion
  //await findAllStudents();

  // Delete all remaining students
  //await deleteAllStudents();

  //use projection for finding all id 
  //await findAllStudentIds();



  //read specific student base on query condtition (here city:"comilla" role:"tester")
  //await findQuery(); 

  //find data using limit
  //await findAllDataLimit(); 

  //sorting data (if 1 then accending order and if -1 then decending order )
  //await findDataBySort(); 



  /*updateOnde method has 3type data 
    1.search query:kon data update korte chaccehn seta, 
    2.new ki ki value add korte chacchi seta 
    3.at last callback function thakbe
   */
  //await updateOneData(); 


  //create the collection/table
  //await createMyCollection();

  //delete the collection table
  //await deleteCollection(); 

  await client.close();
}

main();
