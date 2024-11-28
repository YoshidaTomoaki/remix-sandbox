import { type ActionFunctionArgs } from "@remix-run/node";
import { logout } from "~/utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  return logout(request);
};
