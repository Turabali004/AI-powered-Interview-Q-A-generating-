import express from "express"
import { 
  togglePinQuestion, 
  updateQuestionNote, 
  addQuestionsToSession 
} from '../controllers/questionControllers.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add one or multiple questions to a session
router.post('/add', protect, addQuestionsToSession);

// Toggle pin status of a question in a session
// Example: POST /:id/pin  → where :id is session ID
router.post('/:id/pin', protect, togglePinQuestion);

// Update note on a question in a session
// Example: POST /:id/note  → where :id is session ID
router.post('/:id/note', protect, updateQuestionNote);

export default router;