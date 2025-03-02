const { database } = require("../config/firebase");
const { ref, remove } = require("firebase/database");

const removeBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const bookingRef = ref(database, `Booking/${bookingId}`);
        
        const snapshot = await get(bookingRef);
        if (!snapshot.exists()) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        await remove(bookingRef);
        res.json({ message: "Booking removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing booking", error: error.message });
    }
};

module.exports = { removeBooking };