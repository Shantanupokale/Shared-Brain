"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
const ContentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
});
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
const LinkSchema = new mongoose_1.Schema({
    /// it is the last small strings
    // 'userId' is a reference to the 'User' collection in the database.
    // It uses Mongoose's ObjectId type for relational data.
    // The 'ref' property specifies the referenced collection name ('User').
    // The 'required' property ensures this field must be provided when creating a document.
    // The 'unique' property enforces that each 'userId' in this collection is unique.
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true },
});
// Exporting the LinkModel based on the LinkSchema
// The model represents the 'Links' collection in the database
exports.LinkModel = (0, mongoose_1.model)("Links", LinkSchema);
