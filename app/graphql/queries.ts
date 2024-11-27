import { gql } from "graphql-request";

export type SpeciesData = {
  pokemon_v2_pokemonspeciesname: {
    id: number;
    name: string;
    pokemon_species_id: number;
  }[];
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
};

/**
 * 日本語名からポケモンのIDを取得
 */
export const searchPokemonByJapaneseNameQuery = gql`
  query SearchPokemonByJapaneseName($name: String!) {
    pokemon_v2_pokemonspeciesname(where: { name: { _ilike: $name } }) {
      id
      name
      pokemon_species_id
    }
  }
`;

/**
 * ポケモンの詳細を取得
 */
export const searchPokemonDetailBySpeciesIdQuery = gql`
  query GetPokemonFormsBySpeciesId($speciesId: Int!) {
    pokemon_v2_pokemon(where: { pokemon_species_id: { _eq: $speciesId } }) {
      id
      name
      height
      weight
    }
  }
`;

/**
 * 英語名から日本語名を取得
 */
export const getJapanesePokemonNameByEnglishNameQuery = gql`
  query GetJapanesePokemonName($englishName: String!) {
    pokemon_v2_pokemonspeciesname(where: { name: { _ilike: $englishName } }) {
      name
      language_id
    }
  }
`;

export const getJapaneseNameBySpeciesIdQuery = gql`
  query GetJapaneseNameBySpeciesId($speciesId: Int!) {
    pokemon_v2_pokemonspeciesname(
      where: {
        language_id: { _eq: 1 }
        pokemon_species_id: { _eq: $speciesId }
      }
    ) {
      pokemon_species_id
      name
      id
      language_id
      genus
    }
  }
`;
