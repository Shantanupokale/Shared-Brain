"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userlogic_1 = require("../controllers/userlogic");
const router = express_1.default.Router();
// Route 3: Add Content
router.post("/content", authMiddleware_1.userMiddleware, userlogic_1.addContent);
// Route 4: Get User Content
router.get("/content", authMiddleware_1.userMiddleware, userlogic_1.getUserContent);
// Route 5: Delete User Content
router.delete("/content", authMiddleware_1.userMiddleware, userlogic_1.deleteUserContent);
// Route 6: Share Content Link
router.post("/brain/share", authMiddleware_1.userMiddleware, userlogic_1.shareContentLink);
// Route 7: Get Shared Content
router.get("/brain/:shareLink", userlogic_1.getSharedContent);
exports.default = router;
