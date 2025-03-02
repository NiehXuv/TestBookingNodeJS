const { database } = require("../config/firebase");
const { getDatabase, ref, update } = require("firebase/database");



async function updateRoom(req, res) {
    try {
        const { hotelId, roomId } = req.params;
        const { description, price, status } = req.body;

        if (!hotelId || !roomId) {
            return res.status(400).json({ error: "Missing hotelId or roomId" });
        }

        console.log(`Updating room ${roomId} in hotel ${hotelId}`);

        // Reference to the specific room
        const roomRef = ref(database, `Hotel/${hotelId}/Room/${roomId}`);

        // Update room data
        await update(roomRef, {
            ...(description && { Description: description }),
            ...(price != null && { Price: price }),
            ...(status && { Status: status })
        });

        console.log(`Room ${roomId} updated successfully`);

        return res.json({ message: "Room updated successfully" });

    } catch (error) {
        console.error("Error updating room:", error);
        return res.status(500).json({ error: "Failed to update room" });
    }
}

module.exports = { updateRoom };