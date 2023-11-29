import React, { useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WorkoutList = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3000/workouts/api/", {
        headers: {
          authorization: `bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => dispatch({ type: "SET_WORKOUTS", payload: res }))
        .catch((err) => console.log(err));
    };

    if (user) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="container">
        {workouts &&
          workouts.map((work) => <WorkoutDetails key={work._id} work={work} />)}
      </div>
    </>
  );
};

export default WorkoutList;
