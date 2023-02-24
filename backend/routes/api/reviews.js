const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, restoreUser, async (req, res) => {
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



module.exports = router;
