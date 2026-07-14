import { findUserByVerifyToken, updateUser } from "../../../../lib/users";

export async function POST(req) {
  const { token } = await req.json();
  if (!token) return new Response(JSON.stringify({ error: "Missing token" }), { status: 400 });

  const user = await findUserByVerifyToken(token);
  if (!user) return new Response(JSON.stringify({ error: "Invalid token" }), { status: 400 });

  await updateUser(user.id, { verified: true, verifyToken: null });
  return new Response(JSON.stringify({ ok: true }));
}
