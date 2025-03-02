const { database } = require("../config/firebase");
const { getDatabase, ref, push, set } = require("firebase/database");


async function createRoom(req, res) {
    try {
        const { hotelId } = req.params;
        const { description, price, status } = req.body;

        if (!hotelId || !description || price == null || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log(`Creating room for hotel: ${hotelId}`);

        // Reference to the rooms under the specific hotel
        const roomsRef = ref(database, `Hotel/${hotelId}/Room`);
        
        // Generate a new room ID
        const newRoomRef = push(roomsRef);
        const newRoomId = newRoomRef.key;

        // Set room data
        await set(newRoomRef, {
            Description: description,
            Price: price,
            Status: status
        });

        console.log(`Room created successfully with ID: ${newRoomId}`);

        return res.status(201).json({ 
            message: "Room created successfully", 
            roomId: newRoomId 
        });

    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ error: "Failed to create room" });
    }
}

module.exports = { createRoom };