const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

// Check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save the original URL to redirect back after login
    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login");
  }
  next();
};

// Save redirect URL for after login
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Check if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // Check if listing and owner exist
    if (!listing || !listing.owner) {
      req.flash("error", "Listing not found or owner information is missing.");
      return res.redirect(`/listing/${id}`);
    }

    // Log the IDs for debugging
    console.log(
      "Current User ID:",
      res.locals.currUser ? res.locals.currUser._id : "Not Logged In"
    );
    console.log("Listing Owner ID:", listing.owner._id);

    // Check if the current user is the owner of the listing
    if (
      !res.locals.currUser ||
      !listing.owner._id.equals(res.locals.currUser._id) // Ensure both are ObjectIds
    ) {
      req.flash("error", "You aren't the owner of this listing.");
      return res.redirect(`/listing/${id}`);
    }

    next();
  } catch (error) {
    next(error); // Handle any errors that occur during the async operation
  }
};

// Check if the user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    let { reviewId } = req.params;
    let review = await Listing.findById(reviewId);

    // Check if review exists
    if (!review) {
      req.flash("error", "Review not found.");
      return res.redirect(`/listing/${id}`); // Adjust redirection as needed
    }

    // Check if the current user is the author of the review
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not the author of this review.");
      return res.redirect(`/listing/${id}`); // Adjust redirection as needed
    }

    next();
  } catch (error) {
    next(error); // Handle any errors that occur during the async operation
  }
};

// Validation middleware for listings
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Validation middleware for reviews
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};
