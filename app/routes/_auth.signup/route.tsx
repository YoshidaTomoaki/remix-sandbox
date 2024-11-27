import { Link } from "@remix-run/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-4xl font-bold mb-6">PokeAPI GraphQL Practice</h1>
      <p className="text-xl mb-8">新規登録</p>
      <Link
        to="/search"
        className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-semibold transition-all hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
      >
        新規登録機能だ！
      </Link>
    </div>
  );
}
