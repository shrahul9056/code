const { MongoClient, ObjectId } = require('mongodb');
const connectDB = require('../routes/atlas');

const editEmp = async (req, res, next) => {
  const db = await connectDB();
  const collection = db.collection('employees');

  try {
    const employee = await collection.findOne({ _id: new ObjectId(req.query.edit) });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    req.employee = employee;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};

module.exports = editEmp;
