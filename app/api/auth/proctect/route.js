import { NextResponse } from "next/server";

// This route is only reachable if middleware.js confirms the user is logged in.
// Middleware injects x-user-id / x-user-email headers after verifying the JWT.
export async function GET(req) {
  const userId = req.headers.get("x-user-id");
  const email = req.headers.get("x-user-email");

  return NextResponse.json({
    success: true,
    message: "You are viewing protected data",
    user: { userId, email },
  });
}
