import bcrypt from "bcrypt";
import { findUserByResetToken, updateUser } from "../../../../lib/users";

export async function POST(req) {
  const { token, password } = await req.json();
  if (!token || !password) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

  const user = await findUserByResetToken(token);
  if (!user) return new Response(JSON.stringify({ error: "Invalid token" }), { status: 400 });
  if (!user.resetTokenExpires || Date.now() > user.resetTokenExpires) {
    return new Response(JSON.stringify({ error: "Token expired" }), { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  await updateUser(user.id, { passwordHash: hash, resetToken: null, resetTokenExpires: null });
  return new Response(JSON.stringify({ ok: true }));
}
