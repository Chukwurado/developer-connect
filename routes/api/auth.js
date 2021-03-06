const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");

const User = require("../../models/User");

//@route    GET api/auth
//@desc     Get current user
//@access   Private
router.get("/", auth, async (req, res) => {
    try {
        // get current user without password
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route    POST api/auth
//@desc     Authenticate user and get token
//@access   Public
router.post(
    "/",
    [
        check("email", "Please enter an email").isEmail(),
        check("password", "Please enter a password").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //if errors exist
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            // See if user does not exists
            if (!user) {
                //add return to prevent unhandledpromise console error message
                return res.status(400).json({
                    errors: [{ msg: "Invalid credentials" }]
                });
            }

            //compare passwords
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid credentials" }]
                });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 3600000000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            // This error occurs if ther is something wrong with the server
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
