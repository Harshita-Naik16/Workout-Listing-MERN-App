import React, { useEffect } from "react";
import WorkoutList from "./WorkoutList";
import WorkoutForm from "./WorkoutForm";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="home pages">
      <WorkoutList />
      <WorkoutForm />
    </div>
  );
};

export default Home;
