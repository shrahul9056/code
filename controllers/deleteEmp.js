const { MongoClient, ObjectId} = require('mongodb');
const connectDB = require('../routes/atlas');

const deleteEmp = async (req, res, next) => {
  const db = await connectDB();
  const id = req.query.delete;
  try {
    const deletedEmp = await db.collection('employees').findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedEmp) {
      res.status(404).send('Employee not found');
    } else {
      console.log(`Deleted employee with ID ${id}`);
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete employee');
  }
};

module.exports = deleteEmp;
