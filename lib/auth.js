import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

const TOKEN_EXPIRY = "7d";
const COOKIE_NAME = "token";

// Create a signed JWT containing the user's id and email
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secretKey);
}

// Verify a JWT and return its payload, or null if invalid/expired
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    return null;
  }
}

export { COOKIE_NAME };
