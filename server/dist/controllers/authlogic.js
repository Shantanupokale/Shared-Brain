"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const db_1 = require("../models/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
// Route 1: User Signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({ username, password });
        res.status(200).json({
            message: "User signed up",
        });
    }
    catch (error) {
        res.status(411).json({
            message: "User already exists",
        });
    }
});
exports.signup = signup;
// Route 2: User Signin
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_SECRET);
        res.status(200).json({ token });
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials",
        });
    }
});
exports.signin = signin;
