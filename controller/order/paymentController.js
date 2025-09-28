const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;
        console.log("cartItems", cartItems);

        // Fetch the user details based on userId from request
         const user = await userModel.findOne({ _id: request.userId });

        // Define the parameters for Stripe checkout session
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QE9IFJfqnyho4HmvXVbQMax'
                }
            ],
            customer_email: user.email,
            metadata : {
                userId : request.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'usd',  // Correct currency format
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100 // Stripe expects the amount in cents
                    },
                    adjustable_quantity: {
                        enabled: true,  // Corrected from 'enable'
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create(params);

        // Respond with the created session
        response.status(303).json(session);
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = paymentController;
