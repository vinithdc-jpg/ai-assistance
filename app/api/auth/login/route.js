import bcrypt from "bcrypt";
import { signAccess, signRefresh } from "../../../../lib/jwt";
import { findUserByEmail, updateUser } from "../../../../lib/users";

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

  const user = await findUserByEmail(email);
  if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash || "");
  if (!ok) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

  const access = signAccess({ sub: user.id, email: user.email });
  const refresh = signRefresh({ sub: user.id });

  // persist refresh token
  await updateUser(user.id, { refreshToken: refresh });

  return new Response(JSON.stringify({ access, refresh, user: { id: user.id, email: user.email, name: user.name } }), { status: 200 });
}
