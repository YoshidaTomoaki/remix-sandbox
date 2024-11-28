import { json, type ActionFunctionArgs } from "@remix-run/node";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { createUser, createUserSession } from "~/utils/auth.server";

export const action = async ({
  request,
  context,
}: ActionFunctionArgs & { context: AppLoadContext }) => {
  console.log("action", request.method);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  console.log("email", email);
  console.log("password", password);
  console.log("username", username);

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    console.log("フォームの入力内容が正しくありません");
    return json(
      { error: "フォームの入力内容が正しくありません" },
      { status: 400 }
    );
  }

  try {
    const user = await createUser(context, email, password, username);
    return createUserSession(user.id, "/");
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    return json({ error: "アカウントの作成に失敗しました" }, { status: 400 });
  }
};
