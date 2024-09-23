const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true, // Ensure that the review body is required
  },
  rating: {
    type: Number,
    required: true, // Ensure that the rating is required
    min: 1, // Rating must be at least 1
    max: 5, // Rating can be at most 5
  },
});

// Create the Review model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
