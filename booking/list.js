const { database } = require("../config/firebase");
const { ref, get } = require("firebase/database");

const listAllBookings = async (req, res) => {
    try {
        const bookingRef = ref(database, "Booking");
        const snapshot = await get(bookingRef);
        
        if (!snapshot.exists()) {
            return res.status(404).json({ message: "No bookings found" });
        }
        
        res.json(snapshot.val());
    } catch (error) {
        res.status(500).json({ message: "Error retrieving bookings", error: error.message });
    }
};

module.exports = { listAllBookings };