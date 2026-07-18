import mongoose from "mongoose";
import { ACTIVITY_TYPE } from "@/lib/constants";

const ActivityLogSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
      index: true,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actorRole: {
      type: String,
      enum: ["customer", "agent", "admin", "system"],
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ACTIVITY_TYPE),
      required: true,
    },
    // Human-readable description of the activity
    description: {
      type: String,
      required: true,
    },
    // Optional metadata payload (e.g. { from: "open", to: "resolved" })
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ ticket: 1, createdAt: -1 });

export default mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", ActivityLogSchema);
