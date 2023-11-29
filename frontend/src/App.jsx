import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <WorkoutProvider>
          <Navbar />
          <Outlet />
        </WorkoutProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
