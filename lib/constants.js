// lib/constants.js
// Shared enums and constants for the Ticket Management module

export const TICKET_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  WAITING_ON_CUSTOMER: "waiting_on_customer",
  RESOLVED: "resolved",
  CLOSED: "closed",
};

export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export const TICKET_CATEGORY = {
  BILLING: "billing",
  TECHNICAL: "technical",
  GENERAL: "general",
  FEATURE_REQUEST: "feature_request",
  BUG: "bug",
  ACCOUNT: "account",
  OTHER: "other",
};

export const USER_ROLE = {
  CUSTOMER: "customer",
  AGENT: "agent",
  ADMIN: "admin",
};

export const ACTIVITY_TYPE = {
  CREATED: "ticket_created",
  STATUS_CHANGED: "status_changed",
  PRIORITY_CHANGED: "priority_changed",
  ASSIGNED: "assigned",
  REPLIED: "replied",
  NOTE_ADDED: "note_added",
  ATTACHMENT_ADDED: "attachment_added",
  CLOSED: "ticket_closed",
  REOPENED: "ticket_reopened",
};

export const NOTIFICATION_TYPE = {
  NEW_TICKET: "new_ticket",
  NEW_REPLY: "new_reply",
  STATUS_UPDATE: "status_update",
  ASSIGNMENT: "assignment",
};

export const STATUS_LABELS = {
  [TICKET_STATUS.OPEN]: "Open",
  [TICKET_STATUS.IN_PROGRESS]: "In Progress",
  [TICKET_STATUS.WAITING_ON_CUSTOMER]: "Waiting on Customer",
  [TICKET_STATUS.RESOLVED]: "Resolved",
  [TICKET_STATUS.CLOSED]: "Closed",
};

export const PRIORITY_LABELS = {
  [TICKET_PRIORITY.LOW]: "Low",
  [TICKET_PRIORITY.MEDIUM]: "Medium",
  [TICKET_PRIORITY.HIGH]: "High",
  [TICKET_PRIORITY.URGENT]: "Urgent",
};

export const CATEGORY_LABELS = {
  [TICKET_CATEGORY.BILLING]: "Billing",
  [TICKET_CATEGORY.TECHNICAL]: "Technical",
  [TICKET_CATEGORY.GENERAL]: "General Inquiry",
  [TICKET_CATEGORY.FEATURE_REQUEST]: "Feature Request",
  [TICKET_CATEGORY.BUG]: "Bug Report",
  [TICKET_CATEGORY.ACCOUNT]: "Account",
  [TICKET_CATEGORY.OTHER]: "Other",
};

export const ITEMS_PER_PAGE = 15;
