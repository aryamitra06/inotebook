const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


// <============ Create a User using: POST "/api/auth/createuser". No login required ============>
router.post('/createuser', 
[
  // All the validations
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], 
async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: hashedpass,
      email: req.body.email,
    })

    // jwt token
    const data = {
      user:{
        id: user.id
      }
    }
    const JWT_SECRET = 'hello@!23';
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})
})

// <============ Login user: POST "/api/auth/login". ============>

router.post('/loginuser', 
[
  // All the validations
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], 
async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

   // Login user auth
   const {email, password} = req.body;
   let user = await User.findOne({email});
   if(!user){
     return res.status(400).json({error: "Username/Password not matched." });
   } 

   const passcompare = await bcrypt.compare(password, user.password);
   if(!passcompare){
    return res.status(400).json({error: "Username/Password not matched." });
   }

       // jwt token
       const data = {
        user:{
          id: user.id
        }
      }
      const JWT_SECRET = 'hello@!23';
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken})

})

// <============ Get logged in user details: POST "/api/auth/getuser". Login is required============>

router.post('/getuser', fetchuser, async (req, res) => {
  userId = req.user.id;
  const user = await User.findById(userId).select('-password');
  res.send(user);
})


module.exports = router