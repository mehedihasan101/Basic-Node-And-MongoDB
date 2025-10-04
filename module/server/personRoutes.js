const express =require('express'); 
const router=express.Router(); 
const person=require('./person.js'); 
const  {jwtAuthMiddleware,generateToken}=require('./jwt.js'); 

/*
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
*/


// add the person with jwt token system
router.post("/signup", async (req, res) => {
  console.log("POST /person hit");
  console.log("Body received:", req.body);

  try {
    const newPerson = new person(req.body); //here req.body is persons data
    const savedPerson = await newPerson.save(); //save the data object into database
    console.log("Data saved:", savedPerson);

    //jwt token part
    // only include safe fields (not password)
    const token = generateToken({ id: savedPerson._id, email: savedPerson.email });
    console.log("Token is: ",token); 


    res.status(201).json({
      message: "Person created successfully!",
      person: savedPerson,
       token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//add login with token system
router.post("/login", async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // 1. Find the user in database or not 
    const user = await person.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Compare password with hashed password 
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Generate token
    const token = generateToken({ id: user._id, email: user.email });

    // 4. Respond
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// GET all persons information
//add jwt authentication by  jwtAuthMiddleware functio that comes from jwt class
router.get("/",jwtAuthMiddleware ,async (req, res) => {
  try {
    const allPersons = await person.find();
    res.json(allPersons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get person by token (after login then server provide token then user can see profile by using this token)
// Get person by token (protected route)
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    // `req.user` was set in jwtAuthMiddleware after verifying the token
    const userData = req.user;
    console.log("Decoded user data from token: ", userData);

    // Extract email (or id) from decoded token
    const userEmail = userData.email;

    // Find the user in DB
    const user = await person.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with profile info
    res.json({user});

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