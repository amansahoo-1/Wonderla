const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const Mongo_url = "mongodb://127.0.0.1:27017/Wonderlust";

async function main() {
  await mongoose.connect(Mongo_url);
}

main()
  .then(() => {
    console.log("connected to db");
    initDB();
  })
  .catch((err) => {
    console.log(err.message);
  });

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData);
    console.log("data was initialized");
  } catch (err) {
    console.error("Error initializing data: ", err);
  }
};
