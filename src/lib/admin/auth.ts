import { cookies } from "next/headers";
import { env } from "@/config/env";

export const ADMIN_COOKIE = "rjha_admin_session";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function adminUsername() {
  return process.env.ADMIN_USERNAME?.trim() || "rajujha";
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "Raju@editor";
}

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    env.supabaseServiceRoleKey ||
    "rjha-admin-dev-secret-change-me"
  );
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toHex(signature);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export function verifyAdminCredentials(username: string, password: string) {
  return username.trim() === adminUsername() && password === adminPassword();
}

export async function createAdminSessionToken() {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${exp}`;
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function isValidAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await sign(payload);
  if (!safeEqual(signature, expected)) return false;

  const [, expRaw] = payload.split(":");
  const exp = Number(expRaw);
  return Number.isFinite(exp) && Date.now() <= exp;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    throw new Error("Unauthorized");
  }
}
