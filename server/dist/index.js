"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
//initialize express app
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
(0, connectDB_1.default)();
app.use("/api/v1/user", authRoutes_1.default);
app.use("/api/v1", userRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
