const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex : true
  })
  .then(() => {
    console.log('mongodb connected...')
  })
  .catch((err) => console.log('some error occured!'))
}

module.exports = connectDB;