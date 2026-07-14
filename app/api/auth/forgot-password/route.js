import { v4 as uuidv4 } from "uuid";
import { findUserByEmail, updateUser } from "../../../../lib/users";

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });

  const user = await findUserByEmail(email);
  if (!user) return new Response(JSON.stringify({ ok: true })); // don't reveal existence

  const token = uuidv4();
  const expires = Date.now() + 1000 * 60 * 60; // 1 hour
  await updateUser(user.id, { resetToken: token, resetTokenExpires: expires });

  // In real app: send email. For dev return token for testing.
  return new Response(JSON.stringify({ ok: true, resetToken: token }));
}
