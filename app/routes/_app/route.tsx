import { NavLink, Outlet, useFetcher } from "@remix-run/react";

export default function Index() {
  const logoutFetcher = useFetcher();

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

        <logoutFetcher.Form action="/api/logout" method="post">
          <button
            type="submit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            ログアウト
          </button>
        </logoutFetcher.Form>
      </nav>

      {/* メインコンテンツエリア */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
