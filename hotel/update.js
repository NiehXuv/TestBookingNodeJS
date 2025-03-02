const { database } = require("../config/firebase");
const { getDatabase, ref, update } = require("firebase/database");


async function updateHotel(req, res) {
    try {
        const { hotelId } = req.params;
        const updatedData = req.body;

        if (!hotelId || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: "Invalid hotel ID or empty update data" });
        }

        const hotelRef = ref(database, `Hotel/${hotelId}`);
        await update(hotelRef, updatedData);

        return res.json({ message: "Hotel updated successfully", hotelId });
    } catch (error) {
        console.error("Error updating hotel:", error);
        return res.status(500).json({ error: "Failed to update hotel" });
    }
}

module.exports = { updateHotel };