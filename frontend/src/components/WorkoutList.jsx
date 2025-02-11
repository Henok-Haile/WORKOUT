import "./styles/WorkoutList.css";  // Import CSS

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Formats date to readable time
};

const WorkoutList = ({ workouts, deleteWorkout }) => {
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return <p className="no-workouts">No workouts added yet.</p>;
  }

  return (
    <div className="workout-container">
      {workouts.map((workout) => (
        <div key={workout._id} className="workout-card"> {/* Use workout._id as key */}
          <h3 className="workout-title">{workout.exercise}</h3>
          <p className="workout-info"><strong>Load:</strong> {workout.load} kg</p>
          <p className="workout-info"><strong>Reps:</strong> {workout.reps}</p>
          <p className="workout-time">Created at: {formatDate(workout.createdAt)}</p>
          
          {/* Delete Button */}
          <button className="delete-btn"
          onClick={() => {
            console.log("Delete button clicked for ID:", workout._id); // Debugging
            if (workout._id) {
              deleteWorkout(workout._id);
            } else {
              console.error("Workout ID is undefined!");
            }
          }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;
