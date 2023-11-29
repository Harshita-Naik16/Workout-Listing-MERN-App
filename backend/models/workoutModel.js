const mongoose = require("mongoose");

// Its class is given to us by mongoose which helps validate the data-type and structure of data, How a document or Object look like, etc.
const Schema = mongoose.Schema;

// we define the schema i.e the structure here. It checks our incoming data to be of same type and dosent store to database if type or required data dosent match or exists.

// The first argument of Schema defines the structure of obj
// second defines timestamps property which auto adds a property to obj which tells when it was created or updated.
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Models -- we apply schema to work on certain models

module.exports = mongoose.model("Workout", workoutSchema);

// this will build a collection in our database
// Here mongoose creates a model named "workouts"('s' postfix will be added automatically) which follows the schema.
// we can use it to add data and manipulate data in database from anywhere in our file.

// ex: Workout.find()
