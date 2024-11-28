import { Form, useActionData, Link } from "@remix-run/react";
import type { ActionData } from "~/types/auth";

export default function Login() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold text-center mb-2">ログイン</h2>
      <p className="text-center text-gray-200 mb-6">
        アカウントにログインしてください
      </p>

      {actionData?.error && (
        <div
          className="bg-red-500/50 border border-red-700 text-white px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{actionData.error}</p>
        </div>
      )}

      <Form action="/api/login" method="post" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md shadow-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md shadow-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
        >
          ログイン
        </button>
      </Form>
      <p className="mt-6 text-center text-sm text-gray-200">
        アカウントをお持ちでない方は
        <Link
          to="/signup"
          className="text-white hover:underline font-medium ml-1"
        >
          新規登録
        </Link>
      </p>
    </div>
  );
}
