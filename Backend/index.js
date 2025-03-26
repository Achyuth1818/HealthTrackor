import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from 'body-parser'; // Import body-parser
import cors from 'cors'; // Import cors
import registerRouter from "./routers/registerRouter.js"; // Ensure the correct path for registerRouter

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to enable CORS
app.use(cors(
    {origin:"*"}
));

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Register Routes
app.use("/api", registerRouter); // Use the registration route


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
