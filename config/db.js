const mongoose = require('mongoose')

//funtione mongoosedb connection
  const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URL)
    console.log(`Connected To Database ${mongoose.connection.host}`)

  } catch (error) {
    console.log("Db Error", error)
  }

}

module.exports = { connectDb };