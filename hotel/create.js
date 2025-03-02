const { database } = require("../config/firebase");
const { getDatabase, ref, push } = require("firebase/database");


async function createHotel(req, res) {
    try {
        const { name, description, email, location, phoneNumber } = req.body;

        if (!name || !description || !email || !location || !phoneNumber) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const hotelRef = ref(database, "Hotel");
        const newHotelRef = push(hotelRef, {
            Name: name, 
            Description: description,
            Email: email,
            Location: location,
            PhoneNumber: phoneNumber
        });

        res.status(201).json({ message: "Hotel created successfully", hotelId: newHotelRef.key });
    } catch (error) {
        console.error("Error creating hotel:", error);
        res.status(500).json({ error: "Failed to create hotel" });
    }
}

module.exports = { createHotel };