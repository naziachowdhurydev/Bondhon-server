import { Request, Response, NextFunction } from "express";
import {
  createRemoteJWKSet,
  jwtVerify,
} from "jose";

const authServerURL =
  process.env.AUTH_SERVER_URL || "http://localhost:3000";

const JWKS = createRemoteJWKSet(
  new URL(`${authServerURL}/api/auth/jwks`)
);

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    name: string;
  };
}

export const verifyJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const token = authorization.split(" ")[1];

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: authServerURL,
      audience: authServerURL,
    });

    if (!payload.sub || !payload.email) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    req.user = {
      userId: payload.sub,
      email: String(payload.email),
      name: String(payload.name ?? ""),
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};