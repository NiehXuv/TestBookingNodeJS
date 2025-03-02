const { database } = require("../config/firebase");
const { ref, set, get, push } = require("firebase/database");

async function createStaff(req, res) {
    try {
        const { email, name, phoneNumber, role, hotelId } = req.body;

        // Validate required fields
        if (!email || !name || !phoneNumber || !role || !hotelId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the hotel exists
        const hotelRef = ref(database, `Hotel/${hotelId}`);
        const hotelSnapshot = await get(hotelRef);

        if (!hotelSnapshot.exists()) {
            return res.status(400).json({ error: "Invalid HotelId. The hotel does not exist." });
        }

        // Create new staff entry
        const newStaffRef = push(ref(database, "Staff"));
        const staffId = newStaffRef.key;

        await set(newStaffRef, {
            Email: email,
            Name: name,
            PhoneNumber: phoneNumber,
            Role: role,
            HotelId: hotelId, // Associate staff with the hotel
        });

        return res.status(201).json({ message: "Staff added successfully", staffId });
    } catch (error) {
        console.error("Error adding staff:", error);
        return res.status(500).json({ error: "Failed to add staff" });
    }
}

module.exports = { createStaff };