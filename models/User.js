const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        // regex to validate email
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        // error message
        "Please enter a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  // set to use virtuals
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

// export the User model
module.exports = User;
