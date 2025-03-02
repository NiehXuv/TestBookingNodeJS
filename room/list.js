const { database } = require("../config/firebase");
const { getDatabase, ref, get } = require("firebase/database");

async function listRooms(req, res) {
    try {
        const { hotelId } = req.params;
        if (!hotelId) {
            return res.status(400).json({ error: "Hotel ID is required" });
        }

        console.log(`Fetching rooms for hotel: ${hotelId}`);

        const roomsRef = ref(database, `Hotel/${hotelId}/Room`);
        const snapshot = await get(roomsRef);

        if (snapshot.exists()) {
            console.log("Rooms found:", snapshot.val());
            return res.json(snapshot.val());
        } else {
            console.log("No rooms found for this hotel.");
            return res.json([]);
        }
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return res.status(500).json({ error: "Failed to fetch rooms" });
    }
}

module.exports = { listRooms };