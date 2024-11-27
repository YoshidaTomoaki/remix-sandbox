import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
      <main className="text-center">
        <h1 className="mb-8 text-5xl font-bold">PokeAPI GraphQL Practice</h1>
        <p className="mb-8 text-xl">
          GraphQLを使ってポケモンデータを探索しよう！
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/signup"
            className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-blue-900 transition-all hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          >
            新規登録
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-white px-6 py-3 font-semibold text-blue-900 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            ログイン
          </Link>
        </div>
      </main>
    </div>
  );
}
