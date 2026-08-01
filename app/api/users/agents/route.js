import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getUserFromRequest, ok, err } from "@/lib/ticketUtils";
import { USER_ROLE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);
    if (user.role === USER_ROLE.CUSTOMER) return err("Forbidden", 403);

    await dbConnect();

    const agents = await User.find({
      role: { $in: [USER_ROLE.AGENT, USER_ROLE.ADMIN] },
    })
      .select("name email role")
      .sort({ name: 1 })
      .lean();

    return ok({ agents });
  } catch (error) {
    console.error("GET /api/users/agents error:", error);
    return err("Internal server error", 500);
  }
}
