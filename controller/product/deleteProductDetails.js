const productModel = require("../../models/productModel");

const deleteProductDetails = async (request, response) => {
    try {
        const { _id } = request.body; // Get _id from the request body

        // Ensure _id is provided
        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false,
            });
        }

        // Attempt to delete the product by _id
        const deleteProduct = await productModel.deleteOne({ _id: _id });

        // Check if any product was deleted
        if (deleteProduct.deletedCount === 0) {
            return response.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Return success response
        return response.json({
            message: "Delete successfully",
            error: false,
            success: true,
            data: deleteProduct,
        });
    } catch (error) {
        // Handle errors
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = { deleteProductDetails }; // Export the function
