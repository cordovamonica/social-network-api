const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// TODO fill in the api routes in comments
router.route('/')
.get(getUser)
.post(createUser);

router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;