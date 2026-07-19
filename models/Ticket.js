import mongoose from "mongoose";
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
} from "@/lib/constants";

const AttachmentSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true }, // bytes
    url: { type: String, required: true },
  },
  { _id: false }
);

const TicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    category: {
      type: String,
      enum: Object.values(TICKET_CATEGORY),
      required: [true, "Category is required"],
    },
    priority: {
      type: String,
      enum: Object.values(TICKET_PRIORITY),
      default: TICKET_PRIORITY.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(TICKET_STATUS),
      default: TICKET_STATUS.OPEN,
    },
    tags: [{ type: String, trim: true }],
    attachments: [AttachmentSchema],
    isClosed: {
      type: Boolean,
      default: false,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
    // Linked conversation thread
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    // Satisfaction score from customer (1-5)
    satisfactionScore: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    firstResponseAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ─────────────────────────────────────────────
// Indexes
// ─────────────────────────────────────────────
TicketSchema.index({ customer: 1, createdAt: -1 });
TicketSchema.index({ assignedAgent: 1, status: 1 });
TicketSchema.index({ status: 1, priority: 1 });
TicketSchema.index({ ticketNumber: "text", title: "text", description: "text" });

// ─────────────────────────────────────────────
// Auto-generate ticket number before save
// ─────────────────────────────────────────────
TicketSchema.pre("save", async function () {
  if (!this.ticketNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    const seq = String(count + 1).padStart(5, "0");
    this.ticketNumber = `TKT-${year}-${seq}`;
  }

  // Auto-set resolvedAt / closedAt timestamps
  if (this.isModified("status")) {
    if (this.status === TICKET_STATUS.RESOLVED && !this.resolvedAt) {
      this.resolvedAt = new Date();
    }
    if (this.status === TICKET_STATUS.CLOSED) {
      this.isClosed = true;
      if (!this.closedAt) this.closedAt = new Date();
    } else {
      this.isClosed = false;
    }
  }
});

// ─────────────────────────────────────────────
// Virtual: age of ticket in hours
// ─────────────────────────────────────────────
TicketSchema.virtual("ageInHours").get(function () {
  return Math.floor((Date.now() - this.createdAt.getTime()) / 3_600_000);
});

TicketSchema.set("toJSON", { virtuals: true });
TicketSchema.set("toObject", { virtuals: true });

export default mongoose.models.Ticket ||
  mongoose.model("Ticket", TicketSchema);
