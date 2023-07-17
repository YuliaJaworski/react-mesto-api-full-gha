const jwt = require('jsonwebtoken');
const { TokenError } = require('./error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new TokenError('необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (e) {
    next(new TokenError('необходима авторизация'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
