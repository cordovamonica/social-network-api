const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/') // api/thoughts
.get(getThoughts)
.post(createThought);

router.route('/:thoughtid') // api/thoughts/:id
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtid/reactions')
.post(addReaction);

router.route('/:thoughtid/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;