const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const { app, server } = require('./socket/index'); // Importing from socket setup

// Configure app middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Ensure this is the exact frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());

// Set up routes
app.use("/api",router);

// Define PORT with proper order of fallback
const PORT = process.env.PORT || 5000;

// Connect to database and start server
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
