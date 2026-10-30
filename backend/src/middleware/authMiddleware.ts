import jwt from "jsonwebtoken";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

export interface AuthenticatedRequest
  extends Request {
  adminId?: number;
}

function getJwtSecret(): string {
  return (
    process.env.JWT_SECRET ||
    "development-secret-change-before-deployment"
  );
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const parts =
      authorization.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header",
      });
    }

    const token = parts[1];

    const decoded =
      jwt.verify(
        token,
        getJwtSecret()
      ) as {
        adminId: number;
        username: string;
      };

    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    console.error(
      "Admin authentication error:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired authentication token",
    });
  }
}