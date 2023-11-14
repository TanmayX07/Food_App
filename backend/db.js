const mongoose = require("mongoose");

const mongoURI = "INSERT YOUR DB LINK"; // Customer change url

module.exports = async function () {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const data = await foodCollection.find({}).toArray();

    const categoryCollection = mongoose.connection.db.collection("Categories");
    const Catdata = await categoryCollection.find({}).toArray();

    return { data, Catdata };
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // Rethrow the error for the caller to handle
  }
};
