const express = require("express");
const router = express.Router();
const { GetStudents, deleteBranch, PostOrUpdateStudents, PostSingleStudent, deleteStudentById } = require("../controllers/studentscontroller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/getstudents", protect, adminOnly, GetStudents);
router.delete("/deletebranch", protect, adminOnly, deleteBranch);
router.delete("/deletestudent/:mail", protect, adminOnly, deleteStudentById);
router.post("/uploadstudent",  protect, adminOnly, PostSingleStudent);
router.post("/uploadstudents", protect, adminOnly, PostOrUpdateStudents);

module.exports = router;