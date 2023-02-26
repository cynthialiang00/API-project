const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();
//Delete a Spot Image
// Auth: True
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;

    let spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: [
            {model: Spot}
        ]
    });

    // Error response: Couldn't find a Spot Image with the specified id
    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
    };

    flatSpotImage = spotImage.toJSON();
    
    // Spot must belong to the current user
    if (flatSpotImage.Spot.ownerId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }

    await spotImage.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
});


module.exports = router;