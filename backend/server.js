require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// invoke express like express.use() etc
const app = express();

app.use(cors(corsOptions));

// middlewares
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

// routes
app.use("/workouts/api", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to database (the connect takes time so its async that returns a promise)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // We want to listen to the port, only when we connect to database
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
