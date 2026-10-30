"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getJwtSecret() {
    return (process.env.JWT_SECRET ||
        "development-secret-change-before-deployment");
}
function requireAdmin(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const parts = authorization.split(" ");
        if (parts.length !== 2 ||
            parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization header",
            });
        }
        const token = parts[1];
        const decoded = jsonwebtoken_1.default.verify(token, getJwtSecret());
        req.adminId = decoded.adminId;
        next();
    }
    catch (error) {
        console.error("Admin authentication error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token",
        });
    }
}
