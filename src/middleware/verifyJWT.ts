// import type { NextFunction, Request, Response } from "express";
// import { verifyToken, type AuthPayload } from "../utils/token";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: AuthPayload;
//     }
//   }
// }

// function getToken(req: Request): string | null {
//   const cookieToken: unknown = req.cookies?.token;
//   if (typeof cookieToken === "string" && cookieToken.length > 0) {
//     return cookieToken;
//   }

//   const authHeader = req.headers.authorization;
//   if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.slice("Bearer ".length).trim();
//     return token.length > 0 ? token : null;
//   }

//   return null;
// }

// /**
//  * Accepts a JWT from the `token` cookie or the `Authorization: Bearer <token>`
//  * header and attaches its payload to `req.user`.
//  */
// export function verifyJWT(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void {
//   const token = getToken(req);

//   if (!token) {
//     res.status(401).json({ message: "Authentication required" });
//     return;
//   }

//   try {
//     req.user = verifyToken(token);
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// }

// export default verifyJWT;
