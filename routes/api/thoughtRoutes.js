const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThought)
.post(createThought);

router.route('/:thoughtid')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtid/reactions')
.post(addReaction);

router.route('/:thoughtid/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;