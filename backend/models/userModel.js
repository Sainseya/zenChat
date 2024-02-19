const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, unique: true, sparse: true},
  password: { type: String},
  pic: {
      type: String,
      default:"https://rouelibrenmaine.fr/wp-content/uploads/2018/10/empty-avatar.png"
  },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
      timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === null) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

const User = mongoose.model("User", userSchema)

module.exports = User