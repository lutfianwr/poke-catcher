import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query samplePokeAPIquery($offset: Int!, $limit: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;
