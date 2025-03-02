const { database } = require("../config/firebase");
const { getDatabase, ref, remove } = require("firebase/database");

async function removeRoom(req, res) {
    try {
        const { hotelId, roomId } = req.params;

        if (!hotelId || !roomId) {
            return res.status(400).json({ error: "Missing hotelId or roomId" });
        }

        console.log(`Removing room ${roomId} from hotel ${hotelId}`);

        // Reference to the specific room
        const roomRef = ref(database, `Hotel/${hotelId}/Room/${roomId}`);

        // Remove the room from the database
        await remove(roomRef);

        console.log(`Room ${roomId} removed successfully`);

        return res.json({ message: "Room removed successfully" });

    } catch (error) {
        console.error("Error removing room:", error);
        return res.status(500).json({ error: "Failed to remove room" });
    }
}

module.exports = { removeRoom };