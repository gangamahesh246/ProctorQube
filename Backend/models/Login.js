const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  student_id: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        return this.isAdmin || (value && value.length > 0);
      },
      message: "student_id is required for non-admin users",
    },
  },
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function (v) {
        return this.isAdmin ? v && v.length > 0 : true;
      },
      message: "employeeId is required for admins",
    },
  },

  isAdmin: { type: Boolean, default: false },
});

loginSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

loginSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Logins", loginSchema);
