import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import { graphQLClient } from "~/graphql/init";
import {
  getJapaneseNameBySpeciesIdQuery,
  PokemonDetail,
} from "~/graphql/queries";
import CircularAvatar from "~/components/CircleAvatar";

export const loader = async () => {
  return json({ status: "ok" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const speciesId = formData.get("speciesId");

  try {
    const searchResultBySpeciesId = await graphQLClient.request(
      getJapaneseNameBySpeciesIdQuery,
      {
        speciesId,
      }
    );

    console.log("searchResultBySpeciesId", searchResultBySpeciesId);

    return json({ status: "ok", data: searchResultBySpeciesId });
  } catch (error) {
    return json({
      status: "error",
      error: "ポケモンが見つかりませんでした。",
    });
  }
};

type ActionData = {
  status: string;
  data?: {
    pokemon_v2_pokemonspeciesname: PokemonDetail[];
  };
  error?: string;
};

export default function Search() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showError, setShowError] = useState(false);
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    if (actionData?.error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData?.error]);

  useEffect(() => {
    if (actionData?.data?.pokemon_v2_pokemonspeciesname?.length) {
      setShowPokemon(true);
    }
  }, [actionData?.data?.pokemon_v2_pokemonspeciesname]);

  const pokemonDetail = actionData?.data?.pokemon_v2_pokemonspeciesname?.[0];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          ポケモン検索
        </h1>
        <Form method="post" className="mb-8 flex flex-col items-center gap-4">
          <input
            className="w-full rounded-full border-2 border-white bg-white/20 p-3 text-center text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="number"
            name="speciesId"
            placeholder="ポケモンIDを入力 (1-898)"
            min="1"
            max="898"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-yellow-400 px-6 py-2 font-semibold text-blue-900 transition-all hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "検索中..." : "検索"}
          </button>
        </Form>
      </div>
      <div
        className={`mb-4 text-center text-red-300 transition-all duration-300 ease-in-out ${
          showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {actionData?.error}
      </div>
      {pokemonDetail && (
        <div
          className={`flex flex-col items-center transition-all duration-300 ease-in-out ${
            showPokemon ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="mb-4 rounded-xl bg-white/30 p-6 backdrop-blur-sm transition-all hover:bg-white/40">
            <CircularAvatar
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.pokemon_species_id}.png`}
              name={pokemonDetail.name}
              size={200}
            />
          </div>
          <p className="text-center text-2xl font-semibold text-white">
            {pokemonDetail.name}
          </p>
        </div>
      )}
    </div>
  );
}
