const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
const Mongo_url = "mongodb://127.0.0.1:27017/Wonderlust";

// Database connection
async function main() {
  try {
    await mongoose.connect(Mongo_url);
    console.log("Connected to DB successfully");
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
  }
}

main();

// Middleware setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(mongoSanitize());

// Custom Helmet CSP configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://images.unsplash.com", "data:"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
    },
  })
);

// Routes

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index route
app.get("/listing", async (req, res) => {
  try {
    const alllisting = await Listing.find({});
    res.render("listings/index", { alllisting });
  } catch (e) {
    res.status(500).send("Error fetching listings");
  }
});

// New route
app.get("/listing/new", (req, res) => {
  res.render("listings/new");
});

// Show route
app.get("/listing/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  } catch (e) {
    res.status(500).send("Error fetching listing");
  }
});

// Create route
app.post("/listing", async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
  } catch (e) {
    res.status(500).send("Error creating listing");
  }
});

// Edit route
app.get("/listing/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  } catch (e) {
    res.status(500).send("Error fetching listing for edit");
  }
});

// Update route
app.put("/listing/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
  } catch (e) {
    res.status(500).send("Error updating listing");
  }
});

// Delete route
app.delete("/listing/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
  } catch (e) {
    res.status(500).send("Error deleting listing");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
