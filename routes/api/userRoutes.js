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

router.route('/') // api/users
.get(getUser)
.post(createUser);

router.route('/:id') // api/users/:id
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;