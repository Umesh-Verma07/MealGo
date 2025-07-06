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
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            const data = {
                name: req.body.name,
                location: req.body.location,
                password: secPassword,
                email: req.body.email,
            };

            await User.create(data).then(res.json({ success: true }));
        } catch (error) {
            console.log(error);
            res.json({ success: false })
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

        let { email, password } = req.body;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Email does not exist" });
            }

            const correctPass = await bcrypt.compare(password, userData.password);
            if (!correctPass) {
                return res.status(400).json({ errors: "Incorrect Password" });
            }

            const data = {
                user:{
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);

            return res.json({ success: true, authToken: authToken});
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

module.exports = router;