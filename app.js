const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const ExpressError = require("./utils/ExpressError");

//requiring listings and reviews from routes
const listings = require("./routes/listing");
const reviews = require("./routes/review");

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
app.use(express.static(path.join(__dirname, "public")));
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

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listing", listings);
app.use("/listing/:id/reviews", reviews);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message, err });
  console.log(err);
});

// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
