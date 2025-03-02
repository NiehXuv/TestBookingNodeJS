const { database } = require("../config/firebase");
const { ref, get, update } = require("firebase/database");

const updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const updates = req.body;

        const bookingRef = ref(database, `Booking/${bookingId}`);
        const bookingSnap = await get(bookingRef);

        if (!bookingSnap.exists()) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const currentBooking = bookingSnap.val();
        const hotelId = updates.hotelId || currentBooking.hotelId;
        const roomId = updates.roomId || currentBooking.roomId;
        const staffId = updates.staffId || currentBooking.staffId;

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

        // Update booking
        await update(bookingRef, updates);
        res.json({ message: "Booking updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

module.exports = { updateBooking };