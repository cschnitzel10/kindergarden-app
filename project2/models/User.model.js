const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    {
      password: {
        type: String,
        required: true
    }
 
  },
  {
    timestamps: true,
  },
  {
    roles: {
      type: String,
      enum: ['Parent', 'admin']
  }
  },
{
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Child'
}]
}

  });

const User = model("User", userSchema);

module.exports = User;
