import React from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// date formatter: date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = (work) => {
  const { title, reps, load, createdAt, _id } = work.work;

  const context = useWorkoutContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/workouts/api/${_id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${user.token}`,
          },
        }
      );
      console.log(user.token);

      const json = await response.json();

      if (response.ok) {
        context.dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>Load: {load} Kgs</p>
      <p>Reps: {reps}</p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span onClick={handleDelete} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
