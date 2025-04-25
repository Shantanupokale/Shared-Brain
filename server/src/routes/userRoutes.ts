import express, { Request, Response } from "express";
import { userMiddleware } from "../middleware/authMiddleware";
import {
  addContent,
  getUserContent,
  deleteUserContent,
  shareContentLink,
  getSharedContent
} from "../controllers/userlogic";

const router = express.Router();

// Route 3: Add Content
router.post("/content",  addContent);

// Route 4: Get User Content
router.get("/content",  getUserContent);

// Route 5: Delete User Content
router.delete("/content",  deleteUserContent);

// Route 6: Share Content Link
router.post("/brain/share",  shareContentLink);

// Route 7: Get Shared Content
router.get("/brain/:shareLink", getSharedContent);

export default router;