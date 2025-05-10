import express from "express";
// TODO: Uncomment and use userMiddleware once authentication is ready
import { userMiddleware } from "../middleware/authMiddleware";
import {
  addContent,
  getUserContent,
  deleteUserContent,
  shareContentLink,
  getSharedContent,
} from "../controllers/userlogic";

const router = express.Router();

// Route 3: Add Content

router.post("/content",userMiddleware, addContent);

// Route 4: Get User Content

router.get("/content",userMiddleware, getUserContent);

// Route 5: Delete User Content

router.delete("/content", userMiddleware,deleteUserContent);

// Route 6: Share Content Link

router.post("/brain/share", userMiddleware , shareContentLink);

// Route 7: Get Shared Content (Public)
router.get("/brain/:shareLink", getSharedContent);

export default router;
