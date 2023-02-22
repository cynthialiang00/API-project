const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();

// get all spots
// VALIDATION: FALSE
router.get('/', async (req,res) => {
    const spots = await Spot.findAll();
    res.json(spots)
})

module.exports = router;