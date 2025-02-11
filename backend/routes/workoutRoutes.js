import express from "express";
import Workout from "../models/Workout.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get User's Workouts (Protected Route)
router.get("/", protect, async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id }); // ✅ Fix: use req.user.id
        res.json(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Add a New Workout (Protected Route)
router.post("/", protect, async (req, res) => {
    try {
        const { exercise, load, reps } = req.body;

        if (!exercise || !load || !reps) {
            return res.status(400).json({ message: "Please provide all workout details" });
        }

        const workout = new Workout({
            user: req.user.id, // Fix: use req.user.id
            exercise,
            load,
            reps,
        });

        await workout.save();
        res.json(workout);
    } catch (error) {
        console.error("Error adding workout:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete a workout by ID
router.delete("/:id", protect, async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
  
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      // Ensure the user owns the workout
      if (workout.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "Unauthorized to delete this workout" });
      }
  
      await workout.deleteOne();
      res.json({ message: "Workout deleted successfully" });
    } catch (error) {
      console.error("Error deleting workout:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;