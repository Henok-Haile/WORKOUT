import { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import WorkoutForm from "../components/WorkoutForm.jsx";
import WorkoutList from "../components/WorkoutList.jsx";
import "./styles/Dashboard.css";


const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  // Fetch workouts when component mounts
  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user not authenticated");
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://workout-qzwy.onrender.com/api/workouts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        console.log("Fetched workouts:", data); // ✅ Debugging Log
        setWorkouts(Array.isArray(data) ? data.reverse() : []);
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // ✅ Add new workout function
  const addWorkout = useCallback(async (newWorkout) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, user not authenticated");
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("https://workout-qzwy.onrender.com/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newWorkout),
      });

      if (!response.ok) {
        throw new Error("Failed to add workout");
      }

      const addedWorkout = await response.json();
      console.log("Workout added:", addedWorkout);

      setWorkouts((prevWorkouts) => [addedWorkout, ...prevWorkouts]);

      enqueueSnackbar("Workout added successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error adding workout:", error.message);
      setError(error.message);
      enqueueSnackbar("Error adding workout: " + error.message, { variant: "error" });
    }
  }, []);

  // Delete workout function
  const deleteWorkout = async (workoutId) => {
    if (!workoutId) {
      console.error("Workout ID is undefined!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, user not authenticated");
      setError("No token found. Please log in.");
      return;
    }

    try {
      console.log(`Attempting to delete workout with ID: ${workoutId}`); // ✅ Fixed template literal

      const response = await fetch(`https://workout-qzwy.onrender.com/api/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Delete Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete workout");
      }

      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== workoutId));

      enqueueSnackbar("Workout deleted successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error deleting workout:", error.message);
      setError(error.message);
      enqueueSnackbar("Error deleting workout: " + error.message, { variant: "error" });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="workout-list">
        <h2>My Workouts</h2>
        {loading && <p>Loading workouts...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <WorkoutList workouts={workouts} deleteWorkout={deleteWorkout} /> {/* ✅ Pass delete function */}
      </div>
      <WorkoutForm addWorkout={addWorkout} />
    </div>
  );
};

export default Dashboard;
