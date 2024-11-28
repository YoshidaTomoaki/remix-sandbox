import { json, type ActionFunctionArgs } from "@remix-run/node";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { verifyLogin, createUserSession } from "~/utils/auth.server";

export const action = async ({
  request,
  context,
}: ActionFunctionArgs & { context: AppLoadContext }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json(
      { error: "フォームの入力内容が正しくありません" },
      { status: 400 }
    );
  }

  const user = await verifyLogin(context, email, password);
  if (!user) {
    return json(
      { error: "メールアドレスまたはパスワードが正しくありません" },
      { status: 400 }
    );
  }

  return createUserSession(user.id, "/");
};
