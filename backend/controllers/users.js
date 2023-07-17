const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError, TokenError } = require('../middlwares/error');

const { NODE_ENV, JWT_SECRET } = process.env;

// получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// получить пользователя по id
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// создать пользователя
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(String(password), 10)
    .then((hashPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashPassword,
      })
        .then((user) => res.status(201).send(user))
        .catch(next);
    })
    .catch(next);
};

// изменить данные пользователя
const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Not found userId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

// изменить аватар пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Not found userId'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({ message: 'введите данные' });
    return;
  }
  User.findOne({ email })
    .select('+password')
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((isValidUser) => {
        if (isValidUser) {
          // const jwt = jsonwebtoken.sign(
          const token = jsonwebtoken.sign(
            {
              _id: user._id,
            },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.send({ data: user.toJSON(), token });
        } else {
          next(new TokenError('неправильный email или пароль'));
        }
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUser,
};
