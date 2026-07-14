import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../../../../lib/users";

export async function POST(req) {
  const body = await req.json();
  const { email, password, name } = body;
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    email,
    name: name || "",
    passwordHash: hash,
    createdAt: new Date().toISOString(),
    verified: false,
  };

  await createUser(user);
  return new Response(JSON.stringify({ ok: true, id: user.id }), { status: 201 });
}
