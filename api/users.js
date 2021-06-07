// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const { User}  = require('../models');

// controllers
const test = async (req, res) => {
    res.json({ message: 'User endpoint OK!'});
}


////create a controller for signup
const signup = async (req, res) => {
    console.log('---- INSIDE OF SIGNUP  ----')
    console.log('req.body =>', req.body)
    const { name, email, password } = req.body

    try {
        // see if a user exist in the database by email
        const user = await  User.findOne({ email})

        //if a user exist in the database by email
        if (user) {
            return res.status(400).json({ message: "Email already exits "})
        } else {
            console.log('Create new user')
            let saltRounds = 12;
            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(password, salt);
            //now create new user
            const newUser = new User({
                name,
                email,
                password: hash
            })
            const saveNewUser = await newUser.save();
            res.json(saveNewUser);
        }
        
    } catch (error) {
        console.log('Error inside of /api/users/signup')
        console.log(error)
        res.status(4000).json({ message: 'Error occured, Please try again ...'})
        
    }
}

// routes
router.get('/test', test);

// POST -> api/users/signup (Public)
router.post('/signup', signup);

// POST api/users/login (Public)
// router.post('/login', login);

// // GET api/users/current (Private)
// router.get('/profile', passport.authenticate('jwt', { session: false }), profile);
// // router.get('/all-users', fetchUsers);

module.exports = router; 