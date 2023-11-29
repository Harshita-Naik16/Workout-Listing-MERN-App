const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const requireAuth = require("../middleware/requireAuth.js");

const routes = express.Router();

// middleware
routes.use(requireAuth);

// Api routes
routes.get("/", getAllWorkouts);

routes.get("/:id", getWorkoutById);

routes.post("/", createWorkout);

routes.delete("/:id", deleteWorkout);

routes.patch("/:id", updateWorkout);

module.exports = routes;
