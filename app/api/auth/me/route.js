import { verifyAccess } from "../../../../lib/jwt";
import { findUserById } from "../../../../lib/users";

export async function GET(req) {
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer (.+)$/);
  if (!m) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const payload = verifyAccess(m[1]);
    const user = await findUserById(payload.sub);
    if (!user) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ id: user.id, email: user.email, name: user.name }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
}
