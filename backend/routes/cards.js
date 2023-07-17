const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    link: Joi.string()
      .required()
      .custom((value, err) => {
        if (!value.match(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)*$/i)) {
          return err.message('Поле "avatar" должно быть валидным url-адресом');
        }
        return value;
      })
      .message('Поле "link" должно быть валидным url-адресом'),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

routerCard.get('/cards', getCards);

routerCard.delete('/cards/:id', validateCardId, deleteCardById);

routerCard.post('/cards', validateCard, createCard);

routerCard.put('/cards/:id/likes', validateCardId, likeCard);

routerCard.delete('/cards/:id/likes', validateCardId, dislikeCard);

module.exports = routerCard;
