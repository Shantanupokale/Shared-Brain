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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedContent = exports.shareContentLink = exports.deleteUserContent = exports.getUserContent = exports.addContent = void 0;
const db_1 = require("../models/db");
const random_1 = require("../utils/random");
// Route 3: Add Content
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = req.body.link;
        const type = req.body.type;
        const title = req.body.title;
        const content = yield db_1.ContentModel.create({
            title,
            link,
            type,
            // @ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json({ message: "Content Added" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addContent = addContent;
// Route 4: Get User Content
const getUserContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId,
    }).populate("userId", "username");
    res.json({ content });
});
exports.getUserContent = getUserContent;
// Route 5: Delete User Content
const deleteUserContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.Id;
        // @ts-ignore
        const userId = req.userId;
        yield db_1.ContentModel.deleteOne({
            contentId,
            userId,
        });
        res.json({ message: "deleted content " });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUserContent = deleteUserContent;
// Route 6: Share Content Link
const shareContentLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId,
        });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = (0, random_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash,
        });
        res.json({ hash });
    }
    else {
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});
exports.shareContentLink = shareContentLink;
// Route 7: Get Shared Content
const getSharedContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId,
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId,
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json({
        username: user.username,
        content,
    });
});
exports.getSharedContent = getSharedContent;
