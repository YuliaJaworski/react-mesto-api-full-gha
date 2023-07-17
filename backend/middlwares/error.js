class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

class TokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class DeleteError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

const error = (err, req, res, next) => {
  let newError;

  if (err.message === 'Not found') {
    newError = new NotFoundError('Пользователь по указанному _id не найден.');
  } else if (err.message === 'Not found userId') {
    newError = new NotFoundError('Пользователь по указанному _id не найден.');
  } else if (err.message === 'Not found card') {
    newError = new NotFoundError('Карточка с указанным _id не найдена.');
  } else if (err.message === 'Not found cardId') {
    newError = new NotFoundError(
      'Переданы некорректные данные для постановки/снятии лайка.',
    );
  } else if (err.message === 'Пользователь не найден') {
    newError = new TokenError('Введен несуществующий email');
  } else if (err.message === 'Маршрут не найден.') {
    newError = new NotFoundError('Маршрут не найден.');
  } else if (err.message === 'необходима авторизация') {
    newError = new TokenError('необходима авторизация');
  } else if (err.message === 'Вы не можете удалить эту карточку') {
    newError = new DeleteError('Вы не можете удалить эту карточку');
  } else if (err.name === 'CastError') {
    newError = new ValidError('Переданы некорректные данные.');
  } else if (err.name === 'ValidationError') {
    newError = new ValidError('Переданы некорректные данные.');
  } else if (err.code === 11000) {
    newError = new ConflictError('Пользователь с таким email уже существует');
  } else if (err.name === 'JsonWebTokenError') {
    newError = new TokenError('Неверный JWT');
  } else {
    newError = new ServerError('Internal server Error');
  }

  res.status(newError.statusCode).send({ message: newError.message });
  next();
};

module.exports = { error, NotFoundError, TokenError };
