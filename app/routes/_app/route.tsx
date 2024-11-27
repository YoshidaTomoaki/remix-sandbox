import { NavLink, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* サイドメニュー */}
      <nav className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">PokeAPI GraphQL Practice</h1>
        <ul className="space-y-2">
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
          {/* 他のメニュー項目をここに追加 */}
        </ul>
      </nav>

      {/* メインコンテンツエリア */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
