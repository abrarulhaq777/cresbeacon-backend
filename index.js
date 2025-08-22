// import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import sosRoutes from "./routes/sosRoutes.js";

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb+srv://uabrar477:LEHC32I4mzRkr7lS@cluster0.yvimnbt.mongodb.net/";

app.use(cors());
app.use(express.json());


// DB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api", sosRoutes);

// Start server
app.listen(8000, () => console.log("Server running on port 8000"));

