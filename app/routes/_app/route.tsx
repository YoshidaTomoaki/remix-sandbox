import { NavLink, Outlet, Form } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* サイドメニュー */}
      <nav className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">PokeAPI GraphQL Practice</h1>

        {/* メニューリスト */}
        <ul className="space-y-2 flex-1">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `block py-2 px-4 rounded transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`
              }
              end
            >
              ホーム
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `block py-2 px-4 rounded transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              ポケモン検索
            </NavLink>
          </li>
        </ul>

        {/* ログアウトボタン */}
        <Form action="/api/logout" method="post">
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            ログアウト
          </button>
        </Form>
      </nav>

      {/* メインコンテンツエリア */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
