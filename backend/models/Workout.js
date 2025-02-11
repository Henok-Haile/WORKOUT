import mongoose from "mongoose";


const WorkoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        exercise: {
            type: String,
            required: true,
        },
        load: {
            type: Number,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;