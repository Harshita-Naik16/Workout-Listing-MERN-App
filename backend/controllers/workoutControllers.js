const mongoose = require("mongoose");
const Workout = require("../models/workoutModel.js");

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // error handling
  const errorArr = [];

  if (!title) {
    errorArr.push("title");
  }
  if (!reps) {
    errorArr.push("reps");
  }
  if (!load) {
    errorArr.push("load");
  }
  if (errorArr.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill all the fields", errorArr });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    // This returns a promise since it takses time.
    // we usually chain things to add data to http header in expressJs
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
};
