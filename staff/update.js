const { database } = require("../config/firebase");
const { ref, update, get } = require("firebase/database");

async function updateStaff(req, res) {
    try {
        const { staffId } = req.params;
        const { name, phoneNumber, role, hotelId } = req.body;

        if (!staffId) {
            return res.status(400).json({ error: "Staff ID is required" });
        }

        const staffRef = ref(database, `Staff/${staffId}`);
        const staffSnapshot = await get(staffRef);

        if (!staffSnapshot.exists()) {
            return res.status(404).json({ error: "Staff not found" });
        }

        // If hotelId is updated, verify if it exists
        if (hotelId) {
            const hotelRef = ref(database, `Hotel/${hotelId}`);
            const hotelSnapshot = await get(hotelRef);
            if (!hotelSnapshot.exists()) {
                return res.status(400).json({ error: "Invalid HotelId" });
            }
        }

        await update(staffRef, {
            ...(name && { Name: name }),
            ...(phoneNumber && { PhoneNumber: phoneNumber }),
            ...(role && { Role: role }),
            ...(hotelId && { HotelId: hotelId })
        });

        return res.json({ message: "Staff updated successfully" });
    } catch (error) {
        console.error("Error updating staff:", error);
        return res.status(500).json({ error: "Failed to update staff" });
    }
}

module.exports = { updateStaff };