const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const Review = require("../models/review");
const router = express.Router({ mergeParams: true });

// Validation middleware for listings
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Validation middleware for reviews
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Index route - Fetch all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllisting = await Listing.find({}).populate("reviews");
    res.render("listings/index", { alllisting });
  })
);

// New route - Render form for creating a new listing
router.get("/new", (req, res) => {
  res.render("listings/new");
});

// Show route - Show details for a single listing
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      // throw new ExpressError(404, "Listing not found");
      res.redirect("/listings");
    }
    res.render("listings/show", { listing });
  })
);

// Create route - Create a new listing
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created! ");
    res.redirect("/listing");
  })
);

// Edit route - Render form for editing a listing
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist");
      // throw new ExpressError(404, "Listing not found");
      res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
  })
);

// Update route - Update an existing listing
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated! ");
    res.redirect(`/listing/${id}`);
  })
);

// Delete route - Delete a listing and associated reviews
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted! ");
    res.redirect("/listing");
  })
);

// Add review to listing
router.post(
  "/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listing/${listing._id}`);
  })
);

// Delete a review
router.delete(
  "/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
  })
);

module.exports = router;
