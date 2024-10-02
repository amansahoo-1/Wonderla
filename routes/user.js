const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

// Render the signup page
router.get("/signup", (req, res) => {
  res.render("users/signup"); // Use res.render to serve the EJS template
});

// Handle signup form submission
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });

    try {
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to Wonderlust");
      res.redirect("/listing");
    } catch (error) {
      console.error(error);
      req.flash("error", "Registration failed. Please try again."); // Flash error message
      res.redirect("/signup"); // Redirect back to signup page on error
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    res.flash("success", "welcome back to wonderlust! you are logged in");
    res.redirect("/listing");
  }
);

module.exports = router;
