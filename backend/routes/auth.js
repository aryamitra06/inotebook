const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Create a user using POST method ('api/auth/')
router.post('/', (req, res) => {
    
    // Creating a new user instance
    const user = new User(req.body);
    user.save();

    // req.body takes the values as json from body
    console.log(req.body);
})

module.exports = router;