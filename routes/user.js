const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Render the signup page
router.get("/signup", (req, res) => {
  res.render("users/signup"); // Use res.render to serve the EJS template
});

// Handle signup form submission
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });

    try {
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        // Change res.login to req.login
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wonderlust");
        res.redirect(req.session.redirectUrl || "/listing");
      });
    } catch (error) {
      console.error(error);
      req.flash("error", "Registration failed. Please try again."); // Flash error message
      res.redirect("/signup"); // Redirect back to signup page on error
    }
  })
);

// Render the login page
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// Handle login form submission
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Wonderlust! You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
  }
);

// Handle logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out.");
    res.redirect("/listing");
  });
});

module.exports = router;
