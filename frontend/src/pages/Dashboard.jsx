import { useState, useEffect, useCallback } from "react";
import WorkoutForm from "../components/WorkoutForm.jsx";
import WorkoutList from "../components/WorkoutList.jsx";
import "./styles/Dashboard.css"; // Import CSS

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch workouts when component mounts
  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user not authenticated");
        setError("No token found. Please log in.");
        setLoading(false); // Prevents infinite loading state
        return;
      }

      try {
        const response = await fetch("https://workout-qzwy.onrender.com/api/workouts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure JWT is sent
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data.reverse() : []); //Latest workout first
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Add new workout function (Wrapped in `useCallback` to optimize re-renders)
  const addWorkout = useCallback(async (newWorkout) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, user not authenticated");
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://workout-qzwy.onrender.com/api/workouts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newWorkout),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add workout");
      }

      const addedWorkout = await response.json();
      console.log("Workout added:", addedWorkout); // Debugging

      setWorkouts((prevWorkouts) => [addedWorkout, ...prevWorkouts]); // Properly updates state
    } catch (error) {
      console.error("Error adding workout:", error.message);
      setError(error.message);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="workout-list">
        <h2>My Workouts</h2>
        {loading && <p>Loading workouts...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <WorkoutList workouts={workouts} />
      </div>
      <WorkoutForm addWorkout={addWorkout} /> {/* Pass the function properly */}
    </div>
  );
};

export default Dashboard;
