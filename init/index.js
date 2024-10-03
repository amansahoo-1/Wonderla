const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const Mongo_url = "mongodb://127.0.0.1:27017/Wonderlust";

async function main() {
  await mongoose.connect(Mongo_url);
}

main()
  .then(() => {
    console.log("connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err.message);
  });

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    // Add 'owner' to each object in initData and insert them
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "66fcbdcbc85273df2b968585",
    }));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  } catch (err) {
    console.error("Error initializing data: ", err);
  }
};

initDB();
