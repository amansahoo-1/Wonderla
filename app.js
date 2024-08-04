const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Mongo_url = "mongodb://127.0.0.1:27017/Wonderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

async function main() {
  await mongoose.connect(Mongo_url);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//render boilerplate
app.get("/", (req, res) => {
  res.render("layouts/boilerplate");
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index route
app.get("/listing", async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listings/index.ejs", { alllisting });
});

// New route
app.get("/listing/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
app.get("/listing/:id", async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Create route
app.post("/listing", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});

// Edit route
app.get("/listing/:id/edit", async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update route
app.put("/listing/:id", async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
});

// Delete route
app.delete("/listing/:id", async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
