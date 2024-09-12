const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");

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
app.get(
  "/listing",
  wrapAsync(async (req, res) => {
    const alllisting = await Listing.find({});
    res.render("listings/index", { alllisting });
  })
);

// New route
app.get("/listing/new", (req, res) => {
  res.render("listings/new");
});

// Show route
app.get(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  })
);

// Create route
app.post(
  "/listing",
  wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    if (result.error) {
      throw new ExpressError(400, result);
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
  })
);

// Edit route
app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  })
);

// Update route
app.put(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "send valid data for listing");
    }
    const id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
  })
);

// Delete route
app.delete(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
  })
);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found !"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message, err });
});

// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
