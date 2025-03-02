const { database } = require("../config/firebase");
const { getDatabase, ref, remove } = require("firebase/database");


async function removeHotel(req, res) {
    try {
        const hotelId = req.params.hotelId;
        if (!hotelId) {
            return res.status(400).json({ error: "Hotel ID is required" });
        }

        // Get all staff linked to the hotel
        const staffRef = ref(database, "Staff");
        const staffSnapshot = await get(staffRef);

        if (staffSnapshot.exists()) {
            const staffData = staffSnapshot.val();
            for (const staffId in staffData) {
                if (staffData[staffId].HotelId === hotelId) {
                    await remove(ref(database, `Staff/${staffId}`));
                }
            }
        }

        console.log(`Removing hotel with ID: ${hotelId}`);

        const hotelRef = ref(database, `Hotel/${hotelId}`);
        await remove(hotelRef);

        return res.json({ message: "Hotel removed successfully", hotelId });
    } catch (error) {
        console.error("Error removing hotel:", error);
        return res.status(500).json({ error: "Failed to remove hotel" });
    }
}

module.exports = { removeHotel };