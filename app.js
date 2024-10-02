const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");

//requiring listings and reviews from routes
const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");

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

//cookie

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Middlewares
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(res.locals.success);
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeuser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeuser, "helloworld");
//   res.send(registeredUser);
// });

app.use("/listing", listingsRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
  // res.redirect("/listings");
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
