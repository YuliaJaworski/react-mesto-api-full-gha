/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eol-last */
// eslint-disable-next-line quotes
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new Error("необходима авторизация");
    err.statusCode = 401;
    next(err);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (e) {
    const err = new Error("необходима авторизация");
    err.statusCode = 401;
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
