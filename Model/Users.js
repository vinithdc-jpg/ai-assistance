export function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export function buildUser({
  id,
  email,
  name = "",
  passwordHash,
  verified = false,
  verifyToken = null,
  resetToken = null,
  resetTokenExpires = null,
  refreshToken = null,
}) {
  return {
    id,
    email: normalizeEmail(email),
    name: String(name),
    passwordHash,
    verified,
    verifyToken,
    resetToken,
    resetTokenExpires,
    refreshToken,
    createdAt: new Date().toISOString(),
  };
}

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    verified: user.verified,
    createdAt: user.createdAt,
  };
}
