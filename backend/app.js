/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const auth = require("./middlwares/auth");
const { createUser, login } = require("./controllers/users");
const error = require("./middlwares/error");
const validateUserBody = require("./middlwares/joiValidater");
const { requestLogger, errorLogger } = require("./middlwares/logger");

const app = express();

app.use(
  cors({ credentials: true, origin: "http://mestojj.nomoredomains.xyz" })
);

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
// app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);

app.post("/signin", validateUserBody, login);

app.post("/signup", validateUserBody, createUser);

app.use(auth);

app.use("/", userRoutes);
app.use("/", cardRoutes);

app.use("*", (req, res, next) => {
  next(new Error("Маршрут не найден."));
});

app.use(errorLogger);

app.use(errors()); // celebrate
app.use(error); // middlwares

app.listen(3000, () => {
  console.log("Слушаю порт 3000");
});
