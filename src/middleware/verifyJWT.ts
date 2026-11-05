import { Request, Response, NextFunction } from "express";
import {
  createRemoteJWKSet,
  jwtVerify,
} from "jose";

const configuredAuthServerURL =
  process.env.AUTH_SERVER_URL ??
  (process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000");

if (!configuredAuthServerURL) {
  throw new Error("AUTH_SERVER_URL is required in production");
}

const authURL = new URL(configuredAuthServerURL);

if (
  !["http:", "https:"].includes(authURL.protocol) ||
  authURL.username ||
  authURL.password ||
  authURL.pathname !== "/" ||
  authURL.search ||
  authURL.hash
) {
  throw new Error("AUTH_SERVER_URL must be an origin without a path or credentials");
}

if (
  process.env.NODE_ENV === "production" &&
  authURL.protocol !== "https:" &&
  !authURL.hostname.endsWith(".localhost") &&
  authURL.hostname !== "localhost" &&
  authURL.hostname !== "127.0.0.1"
) {
  throw new Error("AUTH_SERVER_URL must use HTTPS in production");
}

const authServerURL = authURL.origin;
const JWKS = createRemoteJWKSet(
  new URL("/api/auth/jwks", authServerURL)
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
    const bearerToken = authorization?.match(/^Bearer ([^\s]+)$/i)?.[1];

    if (!bearerToken) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const { payload } = await jwtVerify(bearerToken, JWKS, {
      issuer: authServerURL,
      audience: authServerURL,
    });

    if (
      typeof payload.sub !== "string" ||
      !payload.sub ||
      typeof payload.email !== "string" ||
      !payload.email.includes("@")
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    req.user = {
      userId: payload.sub,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : "",
    };

    next();
  } catch (error) {
    console.warn(
      "JWT verification failed:",
      error instanceof Error ? error.name : "unknown error",
    );

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};