const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();
//Delete a Review Image
// Auth: True
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;

    let rvwImage = await ReviewImage.findByPk(req.params.imageId, {
        include: [
            { model: Review }
        ]
    });

    // Error response: Couldn't find a Review Image with the specified id
    if (!rvwImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    };

    flatRvwImage = rvwImage.toJSON();

    // Review must belong to the current user
    if (flatRvwImage.Review.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }

    await rvwImage.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
});


module.exports = router;