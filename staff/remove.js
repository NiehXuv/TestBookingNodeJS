const { database } = require("../config/firebase");
const { ref, remove } = require("firebase/database");

async function removeStaff(req, res) {
    try {
        const { staffId } = req.params;

        if (!staffId) {
            return res.status(400).json({ error: "Staff ID is required" });
        }

        const staffRef = ref(database, `Staff/${staffId}`);
        await remove(staffRef);

        return res.json({ message: "Staff removed successfully" });
    } catch (error) {
        console.error("Error removing staff:", error);
        return res.status(500).json({ error: "Failed to remove staff" });
    }
}

module.exports = { removeStaff };