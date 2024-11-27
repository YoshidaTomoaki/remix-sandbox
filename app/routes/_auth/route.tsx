import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
