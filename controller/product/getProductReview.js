const review = require("../../models/review")


async function allReviews(req, res) {
    try {
        const allReview = await review.find()
        res.json({
            message : "All user",
            data : allReview,
            success : true,
            error : false
        })
    }catch(err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allReviews