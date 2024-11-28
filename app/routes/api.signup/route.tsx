import { json, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { createUser, createUserSession } from "~/utils/auth.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return json(
      { error: "フォームの入力内容が正しくありません" },
      { status: 400 }
    );
  }

  try {
    const user = await createUser(context, email, password, username);
    return createUserSession(context, user.id, "/home");
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    return json({ error: "アカウントの作成に失敗しました" }, { status: 400 });
  }
};
