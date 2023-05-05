const { MongoClient } = require('mongodb');
const connectDB = require('../routes/atlas');

const employee = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, country, city, skills } = req.body;
  const db = await connectDB();
  const collection = db.collection('employees');
  try {
    const existingEmployee = await collection.find({ email: email }).toArray();
    if (existingEmployee[0]) {
      return res.status(400).json({ success: false, error: "An employee with this email already exists." });
    }

    const newEmployee = { firstName, lastName, email, phoneNumber, address, country, city, skills };
    await collection.insertOne(newEmployee);

    res.status(201).json({ success: true, message: "Employee added successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = employee;
