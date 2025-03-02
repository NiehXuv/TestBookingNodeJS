const { database } = require("../config/firebase");
const { getDatabase, ref, get } = require("firebase/database");


async function listAllHotels(req, res) {
    try {
        console.log("Fetching hotels from database...");

        const hotelsRef = ref(database, 'Hotel');
        const snapshot = await get(hotelsRef);

        if (snapshot.exists()) {
            console.log("Hotels found:", snapshot.val());
            return res.json(snapshot.val());
        } else {
            console.log("No hotels found in the database.");
            return res.json([]);
        }
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return res.status(500).json({ error: "Failed to fetch hotels" });
    }
}

module.exports = { listAllHotels };