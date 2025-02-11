import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors()); // ✅ Allow frontend to call backend

app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
    return res.status(234).send("Welcome To your Fitness Workout GYM");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));