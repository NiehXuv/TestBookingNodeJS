const { database } = require("../config/firebase");
const { ref, get } = require("firebase/database");

async function listStaff(req, res) {
    try {
        const { hotelId } = req.query; // Optional filter by HotelId
        const staffRef = ref(database, "Staff");
        const snapshot = await get(staffRef);

        if (!snapshot.exists()) {
            return res.json([]);
        }

        const staffData = snapshot.val();
        let staffList = Object.keys(staffData).map(key => ({
            id: key,
            ...staffData[key]
        }));

        // Filter by hotelId if provided
        if (hotelId) {
            staffList = staffList.filter(staff => staff.HotelId === hotelId);
        }

        return res.json(staffList);
    } catch (error) {
        console.error("Error fetching staff:", error);
        return res.status(500).json({ error: "Failed to fetch staff" });
    }
}

module.exports = { listStaff };