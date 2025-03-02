const { database } = require("../config/firebase");
const { ref, set, get, push } = require("firebase/database");

const createBooking = async (req, res) => {
    try {
        const { bookIn, bookOut, customerId, eta, etd, extraFee, hotelId, roomId, staffId, paymentStatus } = req.body;

        // Validate hotelId
        const hotelRef = ref(database, `Hotel/${hotelId}`);
        const hotelSnap = await get(hotelRef);
        
        if (!hotelSnap.exists()) {
            return res.status(400).json({ message: "Invalid hotelId" });
        }

        const hotelData = hotelSnap.val();

        // Validate roomId inside the hotel object
        if (!hotelData.Room || !hotelData.Room[roomId]) {
            return res.status(400).json({ message: "Invalid roomId for this hotel" });
        }

        // Validate staffId and ensure it belongs to the same hotel
        const staffRef = ref(database, `Staff/${staffId}`);
        const staffSnap = await get(staffRef);
        if (!staffSnap.exists() || staffSnap.val().HotelId !== hotelId) {
            return res.status(400).json({ message: "Invalid staffId or staff does not belong to this hotel" });
        }

        // Push booking to database
        const bookingRef = ref(database, "Booking");
        const newBookingRef = push(bookingRef);
        await set(newBookingRef, {
            bookIn,
            bookOut,
            customerId,
            eta,
            etd,
            extraFee,
            hotelId,
            roomId,
            staffId,
            paymentStatus
        });

        res.status(201).json({ message: "Booking created successfully", id: newBookingRef.key });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};

module.exports = { createBooking };