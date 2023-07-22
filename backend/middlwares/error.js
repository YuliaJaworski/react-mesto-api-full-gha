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

  if (err instanceof NotFoundError) {
    newError = NotFoundError;
  } else if (err instanceof TokenError) {
    newError = TokenError;
  } else if (err instanceof DeleteError) {
    newError = DeleteError;
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

module.exports = {
  error,
  NotFoundError,
  TokenError,
  DeleteError,
};
