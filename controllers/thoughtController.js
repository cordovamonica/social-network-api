const { User, Thought } = require("../models");

module.exports = {
// all thoughts
getThoughts(req, res) {
Thought.find()
.then((thoughts) => res.json(thoughts))
.catch((err) => res.status(500).json(err));
},

// creates a thought
createThought(req, res) {
  Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
},


  //gets a single thought
getSingleThought(req, res) {
 Thought.findOne({ _id: req.params.thoughtId })
 .then((thought) => {
  if (!thought) {
    return res.status(404).json({ message: "No thought found with this id!" });
  }
  res.json(thought)}
)
.catch((err) => res.status(500).json(err));
},
// update thought
updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>{
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thought)}
    )
    .catch((err) => res.status(500).json(err));
},

// delete thought
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>{
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thought)}
    )
    .catch((err) => res.status(500).json(err));
},

// add reaction
addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>{
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thought)}
    )
    .catch((err) => res.status(500).json(err));
},

// delete reaction
deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>{
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thought)}
    )
    .catch((err) => res.status(500).json(err));
},
};

