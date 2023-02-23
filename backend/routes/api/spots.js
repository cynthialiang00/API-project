const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');

const router = express.Router();

// get all spots
// VALIDATION: FALSE
router.get('/', async (req,res) => {
    const spots = await Spot.findAll({
        include: [
            { 
            model: SpotImage, 
            attributes: ['url', 'preview']
            }
        ]
    });
    
    const spotObjects = [];
    spots.forEach(spot => spotObjects.push(spot.toJSON()));

    for(let spot of spotObjects) {
        const review = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        if (review) {
            spot.avgRating = review.toJSON().avgRating;
        }
        else spot.avgRating = "No Reviews exist for this spot";

        if (spot.SpotImages.length) {
            const filterTrue = spot.SpotImages.filter(image => image.preview === true);
            filterTrue.length ? spot.previewImage = filterTrue[0].url : spot.previewImage = "No Preview Image Available";
        }
        else {
            spot.previewImage = "No Preview Image Available";
        }
        delete spot.SpotImages;
    };

    
    
    res.json({Spots: spotObjects });
})

module.exports = router;