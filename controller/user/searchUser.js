const userModel = require("../../models/userModel");

async function searchUser(req, res) {
  try {
    const { search } = req.body;
    const query = new RegExp(search, "i","g"); // Only use "i" for case-insensitive matching

    const users = await userModel.find({
      "$or": [
        { fullName: query },
        { email: query }
      ]
    }).select("-password"); // Exclude the password field from results

    return res.json({
      message: 'User search results',
      data: users,
      success: true,
      error: false
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
}

module.exports = searchUser;
