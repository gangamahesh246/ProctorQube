const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  section: { type: String, required: true },
  student_mail: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Students", StudentsSchema);
