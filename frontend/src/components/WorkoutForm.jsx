import { useState } from "react";
import "./styles/WorkoutForm.css";

const WorkoutForm = ({ addWorkout }) => {
  const [exercise, setExercise] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout({ exercise, load, reps });
    setExercise("");
    setLoad("");
    setReps("");
  };

  return (
    <div className="workout-form-container">
      <h3>Add New Workout</h3>
      <form onSubmit={handleSubmit} className="workout-form">
        <input type="text" placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} required />
        <input type="number" placeholder="Load (kg)" value={load} onChange={(e) => setLoad(e.target.value)} required />
        <input type="number" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} required />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
