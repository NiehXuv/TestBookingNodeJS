const { database } = require("../config/firebase");
const { getDatabase, ref, update } = require("firebase/database");

async function updateCustomer(req, res) {
    try {
        const { customerId } = req.params;
        const updates = req.body;

        if (!customerId) {
            return res.status(400).json({ error: "Customer ID is required" });
        }

        const db = getDatabase();
        const customerRef = ref(db, `Customer/${customerId}`);

        await update(customerRef, updates);

        return res.json({ message: "Customer updated successfully" });
    } catch (error) {
        console.error("Error updating customer:", error);
        return res.status(500).json({ error: "Failed to update customer" });
    }
}

module.exports = { updateCustomer };