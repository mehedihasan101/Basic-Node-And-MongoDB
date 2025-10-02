const express =require('express'); 
const router=express.Router(); 
const person=require('./person.js'); 

// POST route to add a person
router.post("/", async (req, res) => {
  console.log("POST /person hit");
  console.log("Body received:", req.body);

  try {
    const newPerson = new person(req.body); //here req.body is persons data
    const savedPerson = await newPerson.save(); //save the data object into database
    console.log("Data saved:", savedPerson);

    res.status(201).json({
      message: "Person created successfully!",
      person: savedPerson
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET all persons information
router.get("/", async (req, res) => {
  try {
    const allPersons = await person.find();
    res.json(allPersons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a person by email like(http://localhost:3000/person/email/mehedi@gmail.com)
router.get("/email/:email", async (req, res) => {
  try {
    const person = await person.findOne({ email: req.params.email });
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



//update data into database
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // extract the id from URL
        const updatePersonData = req.body; // new updated data

        const updatedPerson = await person.findByIdAndUpdate(
            personId,
            updatePersonData,
            {
                new: true, // return the updated document
                runValidators: true // run mongoose validation
            }
        );

        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json({
            message: 'Person updated successfully',
            person: updatedPerson
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET persons by work type
router.get("/work/:workType", async (req, res) => {
  try {
    const { workType } = req.params;
    if (!["chef", "waiter", "manager"].includes(workType)) {
      return res.status(400).json({ error: "Invalid work type" });
    }
    const persons = await person.find({ work: workType });
    res.json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE person by _id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPerson = await person.findByIdAndDelete(id);
    if (!deletedPerson) return res.status(404).json({ error: "Person not found" });
    res.json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



//parameterised GET Router
// router.get('/person/:workType',async(req,res)=>{
//     try{
//         const workType= req.params.workType ; 
//         if(workType=='chef' || workType=='manager'|| workType=='waiter'){
//             const response= await person.find({work: workType}); 
//             console.log('response fetched'); 
//             res.status(200).json(response) ; 
//         }else{
//             res.status(404).json({error:'invalid in work type'})
//         }

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'internal server error'}); 
//     }
// })


module.exports=router; 