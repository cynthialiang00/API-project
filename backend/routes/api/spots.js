const express = require('express');

const [validateCreateSpot, validateSpotQuery] = require('../../utils/spots-validation');
const validateCreateReview = require('../../utils/reviews-validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const { Op } = require("sequelize");
const { query } = require('express');

const router = express.Router();


// get all spots
// AUTH & VALIDATION: FALSE
router.get('/', validateSpotQuery, async (req,res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!page) page = 1;
    if (!size) size = 20;

    if (parseInt(page) > 10) page = 10;
    if (parseInt(size) > 20) size = 20;

    if (parseInt(page) && parseInt(size)) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    const where = {};
    if (req.query.minLat && req.query.maxLat) {
        where.lat = { [Op.gte]: Number(minLat), [Op.lte]: Number(maxLat) }
    }
    else if (req.query.minLat) {
        where.lat = { [Op.gte]: Number(minLat) }
    }
    else if (req.query.maxLat) {
        where.lat = { [Op.lte]: Number(maxLat) }
    }

    if(req.query.minLng && req.query.maxLng) {
        where.lng = { [Op.gte]: Number(minLng), [Op.lte]: Number(maxLng) }
    }
    else if (req.query.minLng) {
        where.lng = { [Op.gte]: Number(minLng) }
    }
    else if (req.query.maxLng) {
        where.lng = { [Op.lte]: Number(maxLng) }
    }

    if (req.query.minPrice && req.query.maxPrice) {
        where.price = { [Op.gte]: Number(minPrice), [Op.lte]: Number(maxPrice) }
    }
    else if (req.query.minPrice) {
        where.price = { [Op.gte]: Number(minPrice) }
    }
    else if (req.query.maxPrice) {
        where.price = { [Op.lte]: Number(maxPrice) }
    }
    // -------------------------------
    const spots = await Spot.findAll({
        where,
        include: [
            { 
            model: SpotImage, 
            attributes: ['url', 'preview']
            }
        ],
        limit: query.limit,
        offset: query.offset
    });
    
    
    const spotObjects = [];
    spots.length ? 
    spots.forEach(spot => spotObjects.push(spot.toJSON()))
    : spotObjects.push(spots);


    for(let spot of spotObjects) {
        if (!Object.keys(spot).length) break;
        const review = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        if (review && review.toJSON().avgRating > 0) {
            spot.avgRating = Number(review.toJSON().avgRating).toFixed(1);
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
    res.json({
        Spots: spotObjects,
        page: page,
        size: size });
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
    spots.forEach(spot => spotObjects.push(spot.toJSON()))
    : spotObjects.push(spots);

    for (let spot of spotObjects) {
        if (!Object.keys(spot).length) break
        const review = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        if (review && review.toJSON().avgRating > 0) {
            spot.avgRating = Number(review.toJSON().avgRating).toFixed(1);
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
        spotObject.avgStarRating = Number(review.toJSON().avgRating).toFixed(1);
    }
    else {
        spotObject.numReviews = 0;
        spotObject.avgStarRating = "No Reviews exist for this spot";
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
        ],
        order: [['updatedAt', 'DESC']]
    });

    res.status(200);
    res.json({ Reviews: reviews });
});

// Get all Bookings for a Spot based on the Spot's id
// AUTH: true
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };
    
    
    // If current user is the owner of the spot
    if(spot.ownerId === user.id) {
        const bookings = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: [
                {model: User, attributes: ['id', 'firstName', 'lastName']}
            ]
        });
        res.status(200);
        res.json({Bookings: bookings});
    }

    // If current user is not the owner of the spot
    else {
        const bookings = await Booking.findAll({
            where: {spotId: req.params.spotId},
            attributes: ['spotId', 'startDate', 'endDate']
        });
        res.status(200);
        res.json({ Bookings: bookings });
    }
    
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

    if (!url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg')) {
        const errors = {};
        const err = new Error("Invalid image");
        err.status = 400;
        errors["url"] = "Image url must end in .png, .jpg, or .jpeg";
        err.errors = errors;
        return next(err);
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

// Create a Booking from a Spot based on the Spot's id
// AUTH : true
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { user } = req;
    let { startDate, endDate } = req.body;

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const currentDate = new Date();

    const validationErrors = {};
    const conflictErrors = {};
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {model: Booking, attributes: ['id', 'startDate', 'endDate']}
        ]
    });
    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };
    // Spot must NOT belong to current user
    if(spot.ownerId === user.id){
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }

    if (startDate < currentDate) {
        validationErrors.startDate = "startDate cannot be before current date"
    }
    if (endDate <= startDate) {
        validationErrors.endDate = "endDate cannot be on or before startDate"
    }
    if (Object.keys(validationErrors).length) {
        const err = Error("Validation Error");
        err.errors = validationErrors;
        err.status = 400;
        return next(err);
    }

    const flatSpot = spot.toJSON();
    
    if (flatSpot.Bookings.length) {

        for (let book of flatSpot.Bookings) {
            // console.log('bookstart:', book.startDate)
            if (startDate >= book.startDate && endDate <= book.endDate) {
                conflictErrors.startDate = "Start date conflicts with an existing booking";
                conflictErrors.endDate = "End date conflicts with an existing booking";
            }
            else if (startDate.getTime() === book.startDate.getTime()){
                // console.log('START DATE IS SAME AS START DATE');
                conflictErrors.startDate = "Start date conflicts with an existing booking";
            }
            else if (startDate < book.startDate && endDate > book.startDate) {
                // console.log('OVERLAPPING TIME');
                conflictErrors.endDate = "End date conflicts with an existing booking";
            }
            else if (startDate > book.startDate && startDate < book.endDate) {
                // console.log('START DATE IS BETWEEN START AND END DATE')
                conflictErrors.startDate = "Start date conflicts with an existing booking";
            }
            
        }
    }
    if (Object.keys(conflictErrors).length) {
        const err = Error("Sorry, this spot is already booked for the specified dates");
        err.errors = conflictErrors;
        err.status = 400;
        return next(err);
    }
    const newBook = await Booking.create({
        spotId: req.params.spotId,
        userId: user.id,
        startDate, endDate
    })

    res.status(200);
    res.json(newBook);
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
    res.status(201);
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
        statusCode: res.statusCode
    })
});


module.exports = router;