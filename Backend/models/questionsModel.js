const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    questions: [
    {
        question: String,
        options: [String],
        multiple_response: { type: Boolean },
        correct: [String],
        marks: Number,
    }
  ]
});

module.exports = mongoose.model("Question", QuestionSchema);