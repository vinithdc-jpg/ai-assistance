import { findUserByRefreshToken, updateUser } from "../../../../lib/users";

export async function POST(req) {
  const { refresh } = await req.json();
  if (!refresh) return new Response(JSON.stringify({ error: "Missing refresh token" }), { status: 400 });

  const user = await findUserByRefreshToken(refresh);
  if (!user) return new Response(JSON.stringify({ ok: true })); // idempotent

  await updateUser(user.id, { refreshToken: null });
  return new Response(JSON.stringify({ ok: true }));
}
