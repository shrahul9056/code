const { MongoClient } = require('mongodb');
const connectDB = require('../routes/atlas');

const showemployee = async (name, mobile) => {
  const db = await connectDB();
  try {
    const result = await db.collection('employees').find({
      firstName: { $regex: name, $options: 'i' },
      phoneNumber: { $regex: mobile, $options: 'i' }
    }).toArray();
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = showemployee;
