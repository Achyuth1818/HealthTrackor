import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"; 
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import registerRouter from "./routers/registerRouter.js";
import fitnessRouter from "./routers/fitnessrouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors(
    {origin:"*"}
));


app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));



// Register Routes
app.use("/api", registerRouter);
app.use("/api", fitnessRouter);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






