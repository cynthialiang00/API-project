// backend/routes/api/users.js
const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { firstName, lastName, email, password, username } = req.body;
        const errors = {};
        const existsUserEmail = await User.findAll({
            where: {
                email: email,
            }
        })

        const existsUserName = await User.findAll({
            where: {
                username: username,
            }
        })
        console.log(Object.keys(existsUserEmail).length);
        if (Object.keys(existsUserEmail).length) {
            errors.email = "User with that email already exists";
        }
        if (Object.keys(existsUserName).length) {
            errors.username = "User with that username already exists";
        }

        if (Object.keys(errors).length) {
            const err = new Error("User already exists");
            err.errors = errors;
            err.status = 403;
            return next(err);
        }
        const user = await User.signup({ firstName, lastName, email, username, password });

       const token = await setTokenCookie(res, user);

       const returnUser = user.toSafeObject();
       returnUser.token = token;
        return res.json(returnUser);
    }
);

module.exports = router;
