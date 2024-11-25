import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { GraphQLClient, gql } from "graphql-request";

export const meta: MetaFunction = () => {
  return [
    { title: "Pokemon Search" },
    { name: "description", content: "Pokemon Search" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ status: "ok" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const pokemonName = formData.get("pokemonName");

  const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  const graphQLClient = new GraphQLClient(endpoint);

  const variables = {
    name: pokemonName,
  };
  const searchPokemonByJapaneseNameQuery = gql`
    query SearchPokemonByJapaneseName($name: String!) {
      pokemon_v2_pokemonspeciesname(where: { name: { _eq: $name } }) {
        id
        name
        pokemon_species_id
      }
    }
  `;

  const searchPokemonDetailBySpeciesIdQuery = gql`
    query GetPokemonFormsBySpeciesId($speciesId: Int!) {
      pokemon_v2_pokemon(where: { pokemon_species_id: { _eq: $speciesId } }) {
        id
        name
        height
        weight
        base_experience
      }
    }
  `;

  type SpeciesData = {
    pokemon_v2_pokemonspeciesname: {
      id: number;
      name: string;
      pokemon_species_id: number;
    }[];
  };

  try {
    console.log(variables);
    const speciesData = await graphQLClient.request<SpeciesData>(
      searchPokemonByJapaneseNameQuery,
      variables
    );
    console.log("res", speciesData);

    if (speciesData.pokemon_v2_pokemonspeciesname.length > 0) {
      const speciesId =
        speciesData.pokemon_v2_pokemonspeciesname[0].pokemon_species_id;
      const detailVariables = { speciesId };
      const detailData = await graphQLClient.request(
        searchPokemonDetailBySpeciesIdQuery,
        detailVariables
      );
      console.log(detailData);
      return json({ status: "ok", data: detailData });
    } else {
      console.log("not found");
      return json({
        status: "error",
        error: "ポケモンが見つかりませんでした。",
      });
    }
  } catch (error) {
    console.error(error);
    return json({ status: "error", error: (error as Error).message });
  }
};

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
};

type ActionData = {
  status: string;
  data?: {
    pokemon_v2_pokemon: PokemonDetail[];
  };
  error?: string;
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex h-screen flex-col items-center">
      <Form className="flex flex-col items-center gap-4 mb-8" method="post">
        <input
          className="rounded-md border border-gray-300 p-2"
          type="text"
          name="pokemonName"
          placeholder="ポケモンの名前"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "送信中..." : "検索"}
        </button>
      </Form>
      <div className="flex flex-wrap gap-4 justify-center">
        {actionData?.data?.pokemon_v2_pokemon?.map((pokemonDetail, i) => {
          return (
            <div key={pokemonDetail.id} className="w-1/4">
              <div>name: {pokemonDetail.name}</div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`}
                alt={pokemonDetail.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
