import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
} from "@/lib/constants";

const ALLOWED_SORT_FIELDS = [
  "createdAt",
  "updatedAt",
  "priority",
  "status",
  "title",
];

export function validateCreateTicket(body) {
  const errors = [];
  const { title, description, category, priority, tags } = body ?? {};

  if (!title?.trim()) errors.push("Title is required");
  else if (title.trim().length < 5) errors.push("Title must be at least 5 characters");
  else if (title.trim().length > 200) errors.push("Title cannot exceed 200 characters");

  if (!description?.trim()) errors.push("Description is required");
  else if (description.trim().length < 10)
    errors.push("Description must be at least 10 characters");

  if (!category) errors.push("Category is required");
  else if (!Object.values(TICKET_CATEGORY).includes(category))
    errors.push("Invalid category");

  if (priority && !Object.values(TICKET_PRIORITY).includes(priority))
    errors.push("Invalid priority");

  if (tags && !Array.isArray(tags))
    errors.push("Tags must be an array");

  return { valid: errors.length === 0, errors };
}

export function validateUpdateTicket(body, role) {
  const errors = [];
  const customerFields = ["title", "description", "tags"];
  const agentFields = [
    "title",
    "description",
    "priority",
    "category",
    "assignedAgent",
    "tags",
    "status",
  ];
  const allowed = role === "customer" ? customerFields : agentFields;

  for (const key of Object.keys(body ?? {})) {
    if (!allowed.includes(key)) {
      errors.push(`Field '${key}' cannot be updated by ${role}`);
    }
  }

  if (body?.priority && !Object.values(TICKET_PRIORITY).includes(body.priority))
    errors.push("Invalid priority");

  if (body?.category && !Object.values(TICKET_CATEGORY).includes(body.category))
    errors.push("Invalid category");

  if (body?.status && !Object.values(TICKET_STATUS).includes(body.status))
    errors.push("Invalid status");

  return { valid: errors.length === 0, errors };
}

export function validateMessage(body) {
  const errors = [];
  if (!body?.content?.trim()) errors.push("Message content is required");
  return { valid: errors.length === 0, errors };
}

export function buildSortOption(sortBy, sortOrder) {
  const field = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : "createdAt";
  const order = sortOrder === "asc" ? 1 : -1;
  return { [field]: order };
}

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5 MB
