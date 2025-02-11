import "./styles/WorkoutList.css";
import { formatDistanceToNow } from "date-fns";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const WorkoutList = ({ workouts, deleteWorkout }) => {
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return <p className="no-workouts">No workouts added yet.</p>;
  }

  return (
    <div className="workout-container">
      {workouts.map((workout) => (
        <div key={workout._id} className="workout-card">
          {/* Delete Icon Positioned Absolutely */}
          <button
            className="delete-btn"
            onClick={() => {
              console.log("Delete button clicked for ID:", workout._id);
              if (workout._id) {
                deleteWorkout(workout._id);
              } else {
                console.error("Workout ID is undefined!");
              }
            }}
          >
            <FaTrash />
          </button>

          <div className="workout-details">
            <h3 className="workout-title">{workout.exercise}</h3>
            <p className="workout-info">
              <strong>Load:</strong> {workout.load} kg
            </p>
            <p className="workout-info">
              <strong>Reps:</strong> {workout.reps}
            </p>
            <p className="workout-time">
              {/* <strong>Created:</strong>{" "} */}
              {formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;
