const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const validateCreateReview = require('../../utils/reviews-validation');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, 
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: [{model: SpotImage}]},
            {model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });
    
    const reviewObjects = [];
    reviews.forEach(rvw => reviewObjects.push(rvw.toJSON()));

    for(let rvw of reviewObjects) {
        if (rvw.Spot.SpotImages.length) {
            const filterTrue = rvw.Spot.SpotImages.filter(image => image.preview === true);
            filterTrue.length ? rvw.Spot.previewImage = filterTrue[0].url : rvw.Spot.previewImage = "No Preview Image Available";
        }
        else {
            rvw.Spot.previewImage = "No Preview Image Available";
        }
        delete rvw.Spot.SpotImages;
    }

    res.status(200);
    res.json({Reviews: reviewObjects});
});

// Add an Image to a Review based on the Review's id
// AUTHEN: true
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { url } = req.body;

    const review = await Review.findByPk(req.params.reviewId, {
        include: [
            {model: ReviewImage}
        ]
    })
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (review.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }

    const imageCount = review.ReviewImages.reduce( (count, img) => count+=1 , 0);
    if (imageCount === 10 ) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    }

    const newImg = await ReviewImage.create({
        reviewId: review.id,
        url
    })
    const resImg = await ReviewImage.findByPk(newImg.id, {
        attributes: ['id', 'url']
    });

    res.status(200);
    res.json(resImg);
})

// Edit a Review
// AUTHEN: TRUE
router.put('/:reviewId', requireAuth, validateCreateReview, async (req, res, next) => {
    const { user } = req;
    const { review, stars } = req.body;

    const editReview = await Review.findByPk(req.params.reviewId);
    if (!editReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (editReview.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }

    editReview.set({review, stars});
    await editReview.save();

    res.status(200);
    res.json(editReview)

});

// Delete a Review
// AUTHEN: TRUE
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req;
    console.log(`userId: `, user.id);

    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (review.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }

    await review.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: res.status
    })

});
module.exports = router;
