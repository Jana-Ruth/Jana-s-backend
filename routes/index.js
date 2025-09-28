const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhooks = require("../controller/order/webhook");
const orderController = require("../controller/order/order.controller");
const allOrderController = require("../controller/order/allOrder.controller");
const addressController = require("../controller/user/addressController");
const {
  addProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controller/product/productReviewController");
const allReviews = require("../controller/product/getProductReview");
const getUserById = require("../controller/user/getUserById");
const updatePassword = require("../controller/user/updatePassword");
const searchUser = require("../controller/user/searchUser");
const verifyEmailController = require("../controller/user/verifyEmailController");
const forgotPasswordController = require("../controller/user/forgotPasswordController");
const verifyForgotPasswordOtp = require("../controller/user/verifyForgotPasswordOtp");
const resetpassword = require("../controller/user/resetpassword");
const {
  addAddressController,
  getAddressController,
  updateAddressController,
  deleteAddressController,
} = require("../controller/user/addressAllController");
const {
  deleteProductDetails,
} = require("../controller/product/deleteProductDetails");
const { deleteUserDetails } = require("../controller/user/deleteUserDetails");

router.post("/signup",userSignUpController);
router.post("/verify-email",verifyEmailController);
router.post("/signin",userSignInController);
router.get("/user-details",authToken,userDetailsController);
router.get("/user/:userId",getUserById);
router.put("/forgot-password",forgotPasswordController);
router.put("/verify-forgot-password-otp",verifyForgotPasswordOtp);
router.put("/reset-password",resetpassword);
router.get("/userLogout",authToken,userLogout);

// admin panel
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);
router.put("/update-password",authToken,updatePassword);
router.delete("/delete-user",authToken,deleteUserDetails);
router.post("/search-user",authToken,searchUser);

//product
router.post("/upload-product",authToken,UploadProductController);
router.get("/get-product",getProductController);
router.post("/update-product",authToken,updateProductController);
router.get("/get-CategoryProduct",getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController);
router.delete("/delete-product",deleteProductDetails);

// user add to cart
router.post("/addtocart",authToken,addToCartController);
router.get("/countAddToCartProduct",authToken,countAddToCartProduct);
router.get("/view-card-product",authToken,addToCartViewProduct);
router.post("/update-cart-product",authToken,updateAddToCartProduct);
router.post("/delete-cart-product",authToken,deleteAddToCartProduct);

//payment and order
router.post("/checkout",authToken,paymentController);
router.post("/webhook",webhooks); //api/webhook
router.get("/order-list",authToken,orderController);
router.get("/all-order",authToken,allOrderController);

//Address

// Route to add a new address

router.post("/add-address",authToken,addAddressController);
router.get("/all-address",authToken,getAddressController);
router.put("/update-address",authToken,updateAddressController);
router.delete("/delete-address",authToken,deleteAddressController);

//Reviews
// Route to add a product review
router.post("/add-review",authToken,addProductReview);

router.get("/all-review",authToken,allReviews);

// Route to get all reviews for a specific product
router.get("/:productId",getProductReviews);

// Route to delete a product review by reviewId (and userId for permission check)
router.delete("/:reviewId/:userId",deleteProductReview);

module.exports = router;
