const { database } = require("../config/firebase");
const { getDatabase, ref, push, set } = require("firebase/database");

async function createCustomer(req, res) {
    try {
        const { email, firstName, lastName, phoneNumber, note } = req.body;

        if (!email || !firstName || !lastName || !phoneNumber) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const db = getDatabase();
        const customersRef = ref(db, 'Customer');
        const newCustomerRef = push(customersRef);

        await set(newCustomerRef, {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
            Note: note || ""
        });

        return res.status(201).json({ message: "Customer created successfully", customerId: newCustomerRef.key });
    } catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).json({ error: "Failed to create customer" });
    }
}

module.exports = { createCustomer };