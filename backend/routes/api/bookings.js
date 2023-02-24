const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, User, Spot, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

const router = express.Router();

// Get all of the Current User's Bookings
// AUTH: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const bookings = await Booking.findAll({
        where: {userId: user.id},
        include: [
            {model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: [{ model: SpotImage }]
            }
        ]
    })

    const bookingsObj = [];
    bookings.forEach(book => bookingsObj.push(book.toJSON()));

    for (let book of bookingsObj) {
        if (book.Spot.SpotImages.length) {
            const filterTrue = book.Spot.SpotImages.filter(image => image.preview === true);
            filterTrue.length ? book.Spot.previewImage = filterTrue[0].url : book.Spot.previewImage = "No Preview Image Available";
        }
        else {
            book.Spot.previewImage = "No Preview Image Available";
        }
        delete book.Spot.SpotImages;
    }
    res.status(200);
    res.json({Bookings: bookingsObj});
    
});

module.exports = router;