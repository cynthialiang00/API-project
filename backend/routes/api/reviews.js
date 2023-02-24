const express = require('express');


const validateCreateSpot = require('../../utils/spots-validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, restoreUser, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, include: [{model: SpotImage}]},
            {model: ReviewImage}
        ]
    });
    
    const reviewObjects = [];
    reviews.forEach(rvw => reviewObjects.push(rvw.toJSON()));

    res.json(reviewObjects);
});


module.exports = router;
