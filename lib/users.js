import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "users.json");

async function readUsers() {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeUsers(users) {
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id) {
  const users = await readUsers();
  return users.find((u) => u.id === id);
}

export async function createUser(user) {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function updateUser(id, patch) {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  await writeUsers(users);
  return users[idx];
}

export async function findUserByResetToken(token) {
  const users = await readUsers();
  return users.find((u) => u.resetToken === token);
}

export async function findUserByVerifyToken(token) {
  const users = await readUsers();
  return users.find((u) => u.verifyToken === token);
}

export async function findUserByRefreshToken(token) {
  const users = await readUsers();
  return users.find((u) => u.refreshToken === token);
}

export default {
  readUsers,
  writeUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  findUserByResetToken,
  findUserByVerifyToken,
  findUserByRefreshToken,
};
