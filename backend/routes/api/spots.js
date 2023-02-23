const express = require('express');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const validateCreateSpot = require('../../utils/spots-validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');

const router = express.Router();



// get all spots
// AUTH & VALIDATION: FALSE
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

// get all spots owned by current user
// AUTH: True 
router.get('/current', requireAuth, restoreUser, async (req,res) => {
    const { user } = req;
    const spots = await Spot.findByPk(user.id, {
        include: [
            {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ]
    });

    const spotObjects = [];
    spots.length ? 
    spotsArray.forEach(spot => spotObjects.push(spot.toJSON()))
    : spotObjects.push(spots.toJSON());

    for (let spot of spotObjects) {
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

    res.status = 200;
    res.json({ Spots: spotObjects });
    
})

// Get details of a Spot from an id
// AUTH: False
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });
    
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const spotObject = spot.toJSON();

    const review = await Review.findOne({
        where: {
            spotId: spot.id
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            [sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews']
        ]
    })
    if (review) {
        spotObject.numReviews = review.toJSON().numReviews;
        spotObject.avgStarRating = review.toJSON().avgRating;
    }
    else {
        spotObject.numReviews = null;
        spotObject.avgRating = null;
    }

    if (spotObject.User) {
        spotObject.Owner = spotObject.User;
        delete spotObject.User;
    }    
    res.status = 200;
    res.json(spotObject);
})

//Add an Image to a Spot based on the Spot's id
// AUTH : true
router.post('/:spotId/images', requireAuth, restoreUser, async (req, res, next) => {
    const { user } = req;
    const { url, preview } = req.body;
    // if (!user) {
    //     const err = new Error("Spot must belong to the current user");
    //     err.status = 404;
    //     return next(err);
    // } 
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };

    if(spot.ownerId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }

    const newImg = await spot.createSpotImage({
        url, preview
    });

    // const newImg = Spot.findByPk(req.params.spotId, {
    //     include: [
    //         {model: SpotImage, attributes: ['id', 'url', 'preview']}
    //     ]
    // })
    res.status = 200;
    res.json({
        id: newImg.id,
        url: newImg.url,
        preview: newImg.preview
    });
    
});

// create a spot 
// AUTH: True VALIDATION : True
router.post('/', requireAuth, restoreUser, validateCreateSpot, async (req, res) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    // console.log(`user id: `, user.id);

    const newSpot = await Spot.create({
        ownerId: user.id,
        address, city, state, country, lat, lng, name, description, price
    });
    res.status = 201;
    res.json(newSpot);

})


// 
module.exports = router;