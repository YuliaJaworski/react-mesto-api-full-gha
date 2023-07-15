/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eol-last */
// eslint-disable-next-line quotes
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  // let payload;

  // try {
  //   payload = jwt.verify(token, "SECRET");
  // } catch (e) {
  //   const err = new Error("необходима авторизация");
  //   err.statusCode = 401;
  //   next(err);
  // }

  // req.user = payload;
  // next();
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "SECRET");
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
