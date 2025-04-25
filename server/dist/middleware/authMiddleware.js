"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id; // here req.userId will be sent in json as decode 
        //value from the database
        next();
    }
    else {
        res.status(400).json({
            message: "Incorrect Credentails"
        });
    }
};
exports.userMiddleware = userMiddleware;
