const Card = require('../models/card');
const { NotFoundError, DeleteError } = require('../middlwares/error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new DeleteError('Вы не можете удалить эту карточку');
      }
      Card.findByIdAndRemove(card.id)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        })
        .catch(next);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('Переданы некорректные данные для постановки/снятии лайка.'))
    .then((like) => res.status(200).send(like))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError('Переданы некорректные данные для постановки/снятии лайка.'))
    .then((like) => res.status(200).send(like))
    .catch(next);
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
