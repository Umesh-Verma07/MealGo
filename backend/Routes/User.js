const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "IamUmeshKumarVemaIIITSonepatCSE202226"

router.post('/register',
    [body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            const data = {
                name: req.body.name,
                location: req.body.location,
                password: secPassword,
                email: req.body.email,
            };

            const createdUser = await User.create(data)
            const tokenPayload = { user: { id: createdUser.id } }
            const authToken = jwt.sign(tokenPayload, jwtSecret)

            return res.status(201).json({ success: true, authToken });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false })
        }
    })


router.post('/login',
    [body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Email does not exist" });
            }

            const correctPass = await bcrypt.compare(password, userData.password);
            if (!correctPass) {
                return res.status(400).json({ errors: "Incorrect Password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);

            return res.status(200).json({ success: true, authToken });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false })
        }
    })

module.exports = router;