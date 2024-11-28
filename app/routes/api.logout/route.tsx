import { type ActionFunctionArgs } from "@remix-run/cloudflare";
import { logout } from "~/utils/auth.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  return logout(context, request);
};
