const Question = require("../models/questionsModel");

const GetQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const PostOrUpdateQuestions = async (req, res) => {
  try {
    const { category, questions } = req.body;

    if (!category || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input format" });
    }

    const formattedQuestions = questions.map((q) => ({
      question: q.question,
      options: q.options,
      multiple_response: Array.isArray(q.correct) && q.correct.length > 1,
      correct: q.correct,
      marks: q.marks,
    }));

    const existing = await Question.findOne({ category });

    if (existing) {
      existing.questions = [...existing.questions, ...formattedQuestions];
      await existing.save();
      return res
        .status(200)
        .json({ message: "Question added successfully", data: existing });
    }

    const data = new Question({
      category,
      questions: formattedQuestions,
    });

    await data.save();
    res.status(201).json({ message: "Questions uploaded successfully", data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const existing = await Question.findOne({ category });

    if (!existing) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Question.deleteOne({ category });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}


module.exports = {
  GetQuestions,
  PostOrUpdateQuestions,
  deleteCategory,
};
