const { MongoClient, ObjectId } = require('mongodb');
const connectDB = require('../routes/atlas');

const update = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('employees');
  const { id, firstName, lastName, email, phoneNumber, address, country, city, skills } = req.body;
  
  try {
    const employee = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName, email, phoneNumber, address, country, city, skills } },
      { returnOriginal: false }
    );

    if (!employee.value) {
      return res.status(404).send("Employee not found.");
    }

    res.status(200).send("Employee updated successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the employee.");
  }
};

module.exports = update;
