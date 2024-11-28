import { createCookieSessionStorage, redirect } from "@remix-run/cloudflare";
import type { AppLoadContext } from "@remix-run/cloudflare";
import bcrypt from "bcryptjs";

type User = {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
};

export function getSessionStorage(context: AppLoadContext) {
  const SESSION_SECRET = context.cloudflare.env.SESSION_SECRET;

  if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
  }

  return createCookieSessionStorage({
    cookie: {
      name: "_session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export async function createUser(
  context: AppLoadContext,
  email: string,
  password: string,
  username: string
) {
  const existingUser = await context.cloudflare.env.AUTH_STORE.get(
    `user:${email}`
  );
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  const user: User = {
    id: userId,
    email,
    username,
    passwordHash,
  };

  await context.cloudflare.env.AUTH_STORE.put(
    `user:${email}`,
    JSON.stringify(user)
  );
  await context.cloudflare.env.AUTH_STORE.put(`userId:${userId}`, email);

  return user;
}

export async function verifyLogin(
  context: AppLoadContext,
  email: string,
  password: string
) {
  const userJson = await context.cloudflare.env.AUTH_STORE.get(`user:${email}`);
  if (!userJson) return null;

  const user: User = JSON.parse(userJson);
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) return null;

  return user;
}

export async function createUserSession(
  context: AppLoadContext,
  userId: string,
  redirectTo: string
) {
  const storage = getSessionStorage(context);
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserById(
  context: AppLoadContext,
  userId: string
): Promise<User | null> {
  const email = await context.cloudflare.env.AUTH_STORE.get(`userId:${userId}`);
  if (!email) return null;

  const userJson = await context.cloudflare.env.AUTH_STORE.get(`user:${email}`);
  if (!userJson) return null;

  return JSON.parse(userJson);
}

export async function getUserId(context: AppLoadContext, request: Request) {
  const storage = getSessionStorage(context);
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  context: AppLoadContext,
  request: Request,
  redirectTo: string = "/login"
) {
  const userId = await getUserId(context, request);
  if (!userId) {
    throw redirect(redirectTo);
  }
  return userId;
}

export async function logout(context: AppLoadContext, request: Request) {
  const storage = getSessionStorage(context);
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
