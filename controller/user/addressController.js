const Address = require("../../models/Address");

const addressController = {
  
  // Add a new address
  addAddress: async (req, res) => {
    try {
      const { address, city, pincode, phone, notes } = req.body;
      const currentUser = req.userId;

      // Check if an address already exists for this user
      const existingAddress = await Address.findOne({ userId: currentUser, address });
      if (existingAddress) {
        return res.json({
          message: "Address already exists",
          success: false,
          error: true
        });
      }

      const newAddress = new Address({
        userId: currentUser,
        address,
        city,
        pincode,
        phone,
        notes
      });

      const savedAddress = await newAddress.save();
      return res.json({
        data: savedAddress,
        message: "Address added successfully",
        success: true,
        error: false
      });

    } catch (err) {
      return res.json({
        message: err?.message || "An error occurred",
        error: true,
        success: false
      });
    }
  },

  // Fetch all addresses for the current user
  fetchAddresses: async (req, res) => {
    try {
      const currentUser = req.userId;
      const addressList = await Address.find({ userId: currentUser });

      return res.json({
        data: addressList,
        success: true,
        error: false
      });
    } catch (err) {
      return res.json({
        message: err?.message || "An error occurred",
        error: true,
        success: false
      });
    }
  },

  // Fetch a specific address for editing (preload data)
  editAddress: async (req, res) => {
    try {
      const { addressId } = req.params;
      const currentUser = req.userId;

      const address = await Address.findOne({ _id: addressId, userId: currentUser });
      if (!address) {
        return res.json({
          message: "Address not found",
          success: false,
          error: true
        });
      }

      return res.json({
        data: address,
        success: true,
        error: false
      });
    } catch (err) {
      return res.json({
        message: err?.message || "An error occurred",
        error: true,
        success: false
      });
    }
  },

  // Update an existing address
  updateAddress: async (req, res) => {
    try {
      const { addressId } = req.params;
      const { address, city, pincode, phone, notes } = req.body;
      const currentUser = req.userId;

      const existingAddress = await Address.findOne({ _id: addressId, userId: currentUser });
      if (!existingAddress) {
        return res.json({
          message: "Address not found",
          success: false,
          error: true
        });
      }

      const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { address, city, pincode, phone, notes },
        { new: true }
      );

      return res.json({
        data: updatedAddress,
        message: "Address updated successfully",
        success: true,
        error: false
      });
    } catch (err) {
      return res.json({
        message: err?.message || "An error occurred",
        error: true,
        success: false
      });
    }
  },

  // Delete an address
  deleteAddress: async (req, res) => {
    try {
      const { addressId } = req.params;
      const currentUser = req.userId;

      const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId: currentUser });
      if (!deletedAddress) {
        return res.json({
          message: "Address not found",
          success: false,
          error: true
        });
      }

      return res.json({
        message: "Address deleted successfully",
        success: true,
        error: false
      });
    } catch (err) {
      return res.json({
        message: err?.message || "An error occurred",
        error: true,
        success: false
      });
    }
  }
};

module.exports = addressController;
