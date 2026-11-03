// import jwt from "jsonwebtoken";

// export type UserRole = "user" | "admin";

// export interface AuthUser {
//   id: string;
//   email: string;
//   name?: string;
//   role?: UserRole;
// }

// export interface AuthPayload extends AuthUser {
//   iat?: number;
//   exp?: number;
// }

// const DEFAULT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7; // 7 days

// function getSecret(): string {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error("JWT_SECRET is not defined in the environment");
//   }
//   return secret;
// }

// export function signToken(user: AuthUser): string {
//   const expiresIn =
//     Number(process.env.JWT_EXPIRES_IN_SECONDS) || DEFAULT_EXPIRES_IN_SECONDS;

//   return jwt.sign(user, getSecret(), { expiresIn });
// }

// export function verifyToken(token: string): AuthPayload {
//   const decoded = jwt.verify(token, getSecret());

//   if (typeof decoded === "string") {
//     throw new Error("Invalid token payload");
//   }

//   return decoded as AuthPayload;
// }
