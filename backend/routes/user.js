const express = require("express");
const { loginUser, signupUser } = require("../controllers/userControllers");

const routes = express.Router();

// login
routes.post("/login", loginUser);

// signup
routes.post("/signup", signupUser);

module.exports = routes;
