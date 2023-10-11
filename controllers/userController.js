const { User, Thought } = require("../models");

module.exports = {
//all users
  getUser(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //gets a single user
getSingleUser(req, res) {
  User.findOne({ _id: req.params.id })
    .select("-__v")
    .populate("friends")
    .populate("thoughts")
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    }
    )
    .catch((err) => res.status(500).json(err));
},

 
  // creates a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // updates a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>{
        if (!user) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(user)}
      )
      .catch((err) => res.status(500).json(err));
  },
  // deletes a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // adds a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(user)
      })
      .catch((err) => res.status(500).json(err));
    },
  // deletes a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(user)
      })
      .catch((err) => res.status(500).json(err));
  }
};
        
