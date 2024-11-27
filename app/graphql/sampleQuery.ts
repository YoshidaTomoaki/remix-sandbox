import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
const graphQLClient = new GraphQLClient(endpoint);

const variables = {
  pokemon_species_id: 1,
};

export const sampleQuery = gql`
  query SampleQuery($pokemon_species_id: Int!) {
    pokemon_v2_pokemonspeciesname(
      where: {
        language_id: { _eq: 1 }
        pokemon_species_id: { _eq: $pokemon_species_id }
      }
    ) {
      id
      name
      genus
      pokemon_species_id
      language_id
    }
  }
`;

async function fetchPokemonName() {
  try {
    const data = await graphQLClient.request(sampleQuery, variables);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

fetchPokemonName();
