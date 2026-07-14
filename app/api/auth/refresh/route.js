import { signAccess, verifyRefresh } from "../../../../lib/jwt";
import { findUserByRefreshToken } from "../../../../lib/users";

export async function POST(req) {
  const { refresh } = await req.json();
  if (!refresh) {
    return new Response(JSON.stringify({ error: "Missing refresh token" }), { status: 400 });
  }

  try {
    const payload = verifyRefresh(refresh);
    const user = await findUserByRefreshToken(refresh);
    if (!user || user.id !== payload.sub) {
      return new Response(JSON.stringify({ error: "Invalid refresh token" }), { status: 401 });
    }

    const access = signAccess({ sub: user.id, email: user.email });
    return new Response(JSON.stringify({ access }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid refresh token" }), { status: 401 });
  }
}
