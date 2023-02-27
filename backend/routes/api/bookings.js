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
    bookings.length ? 
    bookings.forEach(book => bookingsObj.push(book.toJSON()))
    : bookingsObj.push(bookings);

    for (let book of bookingsObj) {
        if (!Object.keys(book).length) break;
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

// Edit a Booking
// AUTH: true
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    let { startDate, endDate } = req.body;

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const currentDate = new Date();

    const validationErrors = {};
    const conflictErrors = {};


    const booking = await Booking.findByPk(req.params.bookingId);
    // Error response: Couldn't find a Booking with the specified id
    if(!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    };

    // Require proper authorization: Booking must belong to the current user
    if(booking.userId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    };

    // Error response: Body validation errors
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

    // Error response: Can't edit a booking that's past the end date
    if (booking.endDate < currentDate) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }

    // Error response: Booking conflict
    const existingBookings = await Booking.findAll({
        where: {spotId: booking.spotId}
    })
    
    const flatExistingBookings = [];
    existingBookings.length ? existingBookings.forEach(booking => flatExistingBookings.push(booking.toJSON()))
    : flatExistingBookings = existingBookings.toJSON();

    for (let book of flatExistingBookings) {
        // exclude current booking that we are trying to edit
        if (book.id === parseInt(req.params.bookingId)) {
            // console.log('TRYING TO EDIT SAME BOOKING')
            continue;
        }

        if (startDate >= book.startDate && endDate <= book.endDate) {
            conflictErrors.startDate = "Start date conflicts with an existing booking";
            conflictErrors.endDate = "End date conflicts with an existing booking";
        }
        else if (startDate.getTime() === book.startDate.getTime()) {
            conflictErrors.startDate = "Start date conflicts with an existing booking";
        }
        else if (startDate < book.startDate && endDate > book.startDate) {
            conflictErrors.endDate = "End date conflicts with an existing booking";
        }
        else if (startDate > book.startDate && startDate < book.endDate) {
            conflictErrors.startDate = "Start date conflicts with an existing booking";
        }
    }

    if (Object.keys(conflictErrors).length) {
        const err = Error("Sorry, this spot is already booked for the specified dates");
        err.errors = conflictErrors;
        err.status = 403;
        return next(err);
    }

    booking.set({
        startDate, endDate
    })
    await booking.save();
    res.status(200);
    res.json(booking);
})

// Delete a booking
// AUTH: true
router.delete('/:bookingId', requireAuth, async(req,res,next) => {
    const { user } = req;
    
    let booking = await Booking.findByPk(req.params.bookingId, {
        include: [
            {model: Spot, attributes: ['ownerId']}
        ]
    })
    // Error response: Couldn't find a Booking with the specified id
    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    flatBooking = booking.toJSON();
    //console.log(booking)
    
    //Booking must belong to the current user 
    // OR Spot must belong to the current user
    if(flatBooking.userId !== user.id && flatBooking.Spot.ownerId !== user.id) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err)
    }

    // Error response: Bookings that have been started can't be deleted
    startDate = new Date(flatBooking.startDate);
    const currentDate = new Date();

    if (startDate < currentDate) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err)
    };

    await booking.destroy();
    
    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: res.statusCode
    })
});

module.exports = router;