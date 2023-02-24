const express = require('express');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const validateCreateSpot = require('../../utils/spots-validation');
const validateCreateReview = require('../../utils/reviews-validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

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
router.get('/current', requireAuth, async (req,res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        where: { ownerId: user.id },
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

    res.status(200);
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
    res.status(200);
    res.json(spotObject);
})

// Get all Reviews by a Spot's id
// AUTH: false
router.get('/:spotId/reviews', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };

    const reviews = await spot.getReviews({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });

    res.status(200);
    res.json({ Reviews: reviews });
});


//Add an Image to a Spot based on the Spot's id
// AUTH : true
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { url, preview } = req.body;

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

    res.status(200);
    res.json({
        id: newImg.id,
        url: newImg.url,
        preview: newImg.preview
    });
    
});

// Create a Review for a Spot based on the Spot's id
// AUTH: True
router.post('/:spotId/reviews', requireAuth, validateCreateReview, async (req, res, next) => {
    const { user } = req;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {model: Review, attributes: ['userId']}
        ]
    });
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };
    
    for(let rvw of spot.Reviews) {
        if (rvw.userId === user.id) {
            const err = new Error("User already has a review for this spot");
            err.status = 403;
            return next(err);
        }
    }

    const newRvw = await Review.create({ 
        spotId: req.params.spotId,
        userId: user.id,
        review, stars
    })

    res.status(201);
    res.json(newRvw)
});

// Edit a Spot belonging to the user
// AUTH : true VALIDATION: true
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res, next) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const editSpot = await Spot.findByPk(req.params.spotId);
    if (!editSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };

    if (editSpot.ownerId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }


    editSpot.set({
        address, city, state, country, lat, lng, name, description, price
    });
    await editSpot.save();

    res.status(200);
    res.json(editSpot)
});


// create a spot 
// AUTH: True VALIDATION : True
router.post('/', requireAuth, validateCreateSpot, async (req, res) => {
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

// delete a spot
// AUTH: true
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req;

    const deleteSpot = await Spot.findByPk(req.params.spotId);
    if (!deleteSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };

    if (deleteSpot.ownerId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }

    await deleteSpot.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: res.status
    })
});


// 
module.exports = router;