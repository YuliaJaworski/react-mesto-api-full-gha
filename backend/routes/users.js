const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    about: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .custom((value, err) => {
        if (!value.match(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)*$/i)) {
          return err.message('Поле "avatar" должно быть валидным url-адресом');
        }
        return value;
      })
      .message('Поле "avatar" должно быть валидным url-адресом'),
  }),
});

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

router.patch('/users/me', validateUserInfo, updateUserInfo);

router.patch('/users/me/avatar', validateUserAvatar, updateUserAvatar);

// router.post("/signup", createUser);

// router.post("/signin", login);

module.exports = router;
