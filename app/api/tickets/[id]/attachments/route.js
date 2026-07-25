/**
 * POST /api/tickets/:id/attachments — upload attachment to a ticket
 */

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/db";
import Ticket from "@/models/Ticket";
import {
  getUserFromRequest,
  logActivity,
  ok,
  err,
} from "@/lib/ticketUtils";
import { canAccessTicket } from "@/lib/services/ticketService";
import {
  ALLOWED_MIME_TYPES,
  MAX_ATTACHMENT_SIZE,
} from "@/lib/validation/ticketValidation";
import { ACTIVITY_TYPE } from "@/lib/constants";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return err("Unauthorized", 401);

    await dbConnect();
    const { id } = await params;

    const ticket = await Ticket.findById(id);
    if (!ticket) return err("Ticket not found", 404);
    if (!canAccessTicket(user, ticket)) return err("Forbidden", 403);
    if (ticket.isClosed) return err("Cannot attach files to a closed ticket", 400);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return err("No file provided", 400);
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return err("File type not allowed", 400);
    }

    if (file.size > MAX_ATTACHMENT_SIZE) {
      return err("File exceeds 5 MB limit", 400);
    }

    const ext = path.extname(file.name) || "";
    const filename = `${randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "tickets");

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);

    const attachment = {
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url: `/uploads/tickets/${filename}`,
    };

    ticket.attachments.push(attachment);
    await ticket.save();

    await logActivity({
      ticketId: ticket._id,
      actorId: user.userId,
      actorRole: user.role,
      type: ACTIVITY_TYPE.ATTACHMENT_ADDED,
      description: `Attachment added: ${file.name}`,
      metadata: { filename: file.name },
    });

    return ok({ attachment }, 201);
  } catch (error) {
    console.error("POST /api/tickets/:id/attachments error:", error);
    return err("Internal server error", 500);
  }
}
