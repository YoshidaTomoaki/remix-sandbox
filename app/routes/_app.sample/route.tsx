export async function loader() {
  return null;
}

export default function Sample() {
  throw new Error("サンプルエラー");

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-4xl font-bold mb-6">PokeAPI GraphQL Practice</h1>
      <p className="text-xl mb-8">サンプルページ</p>
    </div>
  );
}
