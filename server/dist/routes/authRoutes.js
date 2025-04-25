"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authlogic_1 = require("../controllers/authlogic");
const router = express_1.default.Router();
router.post("/signin", authlogic_1.signin);
router.post("/signup", authlogic_1.signup);
// router.post("/logout", logout);
exports.default = router;
