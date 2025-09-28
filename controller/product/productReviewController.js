const Order = require("../../models/orderProductModel");
const Product = require("../../models/productModel");
const ProductReview = require("../../models/review");

// Add a product review
const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Check if the user has already reviewed the product
    const existingReview = await ProductReview.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product!",
        error: true,
      });
    }

    // Create and save a new review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    // Recalculate the product's average review rating
    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;
    const averageReview =
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviews;

    // Update the product with the new average review
    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      message: "Review added successfully.",
      data: newReview,
      success: true,
      error: false,
      
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the review.",
      error: true,
    });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      error: false,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching reviews.",
      error: true,
    });
  }
};

// Delete a review
const deleteProductReview = async (req, res) => {
  try {
    const { reviewId, userId } = req.params;

    const review = await ProductReview.findOneAndDelete({ _id: reviewId, userId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you do not have permission to delete this review.",
        error: true,
      });
    }

    // Recalculate and update the product's average rating after deletion
    const reviews = await ProductReview.find({ productId: review.productId });
    const totalReviews = reviews.length;
    const averageReview = totalReviews
      ? reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviews
      : 0;

    await Product.findByIdAndUpdate(review.productId, { averageReview });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
      error: false,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the review.",
      error: true,
    });
  }
};

module.exports = { addProductReview, getProductReviews, deleteProductReview };
