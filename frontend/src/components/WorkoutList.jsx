import "./styles/WorkoutList.css";  // ✅ Import CSS

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // ✅ Formats date to readable time
};

const WorkoutList = ({ workouts }) => {
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return <p className="no-workouts">No workouts found.</p>;
  }

  return (
    <div className="workout-container">
      {workouts.map((workout, index) => (
        <div key={index} className="workout-card">
          <h3 className="workout-title">{workout.exercise}</h3>
          <p className="workout-info"><strong>Load:</strong> {workout.load} kg</p>
          <p className="workout-info"><strong>Reps:</strong> {workout.reps}</p>
          <p className="workout-time">Created at: {formatDate(workout.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;
