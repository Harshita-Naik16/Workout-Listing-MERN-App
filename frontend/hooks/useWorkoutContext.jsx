import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

export const useWorkoutContext = () => {
  let context = useContext(WorkoutContext);

  if (!context) {
    throw Error("out of WorkoutContext scope");
  }

  return context;
};
