// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();
// const connectDB = require('./config/db');
// const router = require('./routes');
// const { app, server } = require('./socket/index'); // Importing from socket setup

// // Configure app middleware
// app.use(cors({
//     origin: 'https://www.fadqusintl.com', // frontend URL
//     credentials: true, // Allow credentials (cookies, etc.)
// }));

// app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(cookieParser());


// // Set up routes
// app.use("/api",router);

// //backend get

// app.get('/', (req, res) => {
//   res.send('Backend is up and running');
// });
// // Define PORT with proper order of fallback add .
// const PORT = process.env.PORT || 5000;

// // Connect to database and start server
// connectDB()
//     .then(() => {
//         server.listen(PORT, () => {
//             console.log("Connected to DB");
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Failed to connect to database:", error.message);
//         process.exit(1); // Exit process if DB connection fails
//     })

//     const mongoose = require('mongoose');
    
//     const MONGODB_URL = process.env.MONGODB_URL;
    
//     mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//       .then(() => {
//         console.log('MongoDB connected successfully');
//       })
//       .catch((err) => {
//         console.log('Error connecting to MongoDB:', err);
//       });
    



const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const webhooks = require('./controller/order/webhook'); // Ensure correct path
const { app, server } = require('./socket/index'); // Importing from socket setup

// ✅ Use raw body ONLY for Stripe webhook
app.post('/webhook', express.raw({ type: 'application/json' }), webhooks);

// ✅ Use JSON middleware only AFTER the webhook route
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cors({
    origin: 'https://jana-s-commerce.vercel.app', // frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
    allowedHeaders: ['Content-Type', 'Authorization'],  // Ensure required headers are exposed
    exposedHeaders: ['Set-Cookie'],  // Allow frontend to read cookies
}));

app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());

// ✅ Set up routes
app.use("/api", router); 

// ✅ Backend test route
app.get('/', (req, res) => {
  res.send('Backend is up and running');
});

// ✅ Define PORT
const PORT = process.env.PORT || 5000;

// ✅ Connect to database and start server
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log("Connected to DB");
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to database:", error.message);
        process.exit(1); // Exit process if DB connection fails
    });

// ✅ MongoDB Connection
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });
