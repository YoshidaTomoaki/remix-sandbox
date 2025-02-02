import { json, redirect } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useFetcher, useNavigation } from "@remix-run/react";
import { getUserId } from "~/utils/auth.server";
import type { ActionData } from "~/types/auth";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const userId = await getUserId(context, request);
  if (userId) {
    return redirect("/home");
  }
  return json({});
}

export default function Login() {
  const fetcher = useFetcher<ActionData>();
  const navigation = useNavigation();
  const isSubmitting =
    fetcher.state === "submitting" || navigation.state !== "idle";

  return (
    <div className="text-white">
      <h2 id="top" className="text-2xl font-bold text-center mb-6">
        ログイン
      </h2>

      {fetcher.data?.error && (
        <div
          className="bg-red-500/50 border border-red-700 text-white px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{fetcher.data.error}</p>
        </div>
      )}

      <fetcher.Form action="/api/login" method="post" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm text-white/70 mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30"
            placeholder="メールアドレス"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm text-white/70 mb-1"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30"
            placeholder="••••••••"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "送信中..." : "ログイン"}
        </button>
      </fetcher.Form>
      <p className="mt-6 text-center text-sm text-white/70">
        アカウントをお持ちでない方は{" "}
        <Link to="/signup" className="text-white hover:text-white/90">
          新規登録
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link to="/" className="text-white hover:text-white/90">
          トップへ戻る
        </Link>
      </p>
    </div>
  );
}
