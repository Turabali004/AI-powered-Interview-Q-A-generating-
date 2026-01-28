import express from "express"

import {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession
} from '../controllers/sessionConrollers.js';

import  { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new session (authenticated user only)
router.post('/create', protect, createSession);

// Get all sessions of the logged-in user
router.get('/my-sessions', protect, getMySessions);

// Get single session by ID (owner only - assuming you check in controller)
router.get('/:id', protect, getSessionById);

// Delete a session by ID (owner only)
router.delete('/:id', protect, deleteSession);

export default router;