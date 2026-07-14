import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev_access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev_refresh_secret";

export function signAccess(payload, opts = {}) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m", ...opts });
}

export function verifyAccess(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function signRefresh(payload, opts = {}) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d", ...opts });
}

export function verifyRefresh(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
