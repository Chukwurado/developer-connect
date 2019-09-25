const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post(
    "/",
    [
        check("name", "Please enter a name")
            .not()
            .isEmpty(),
        check("email", "Please enter an email").isEmail(),
        check("password", "Please enter a password greater than 6").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //if errors exist
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email });
            if (user) {
                //add return to prevent unhandledpromise console error message
                return res.status(400).json({
                    errors: [{ msg: "User already exists" }]
                });
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password and save user
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonwebtoken
            //mongoose allows for user.id instead of user._id
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
