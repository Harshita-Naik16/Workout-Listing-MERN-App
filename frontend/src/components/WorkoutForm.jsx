import React, { useState } from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [error, setError] = useState(null);
  const [errorFields, setErrorFields] = useState([]);

  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Login to submit");
      return;
    }

    const workout = { title, load, reps };
    const data = await fetch("http://localhost:3000/workouts/api/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user.token}`,
      },
      body: JSON.stringify(workout),
    });
    const res = await data.json();

    if (data.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: res });
      setLoad("");
      setReps("");
      setTitle("");
      setError(null);
      setErrorFields([]);
    }
    if (!data.ok) {
      setError(res.message);
      setErrorFields(res.errorArr);
      console.log(errorFields);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errorFields.includes("title") ? "error" : ""}
            // required
          />
        </label>
        <label>
          Load(in kgs):
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className={errorFields.includes("load") ? "error" : ""}
            // required
          />
        </label>
        <label>
          Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className={errorFields.includes("reps") ? "error" : ""}
            // required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WorkoutForm;
