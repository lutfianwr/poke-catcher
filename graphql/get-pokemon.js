import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query samplePokeAPIquery($offset: Int!) {
    pokemon_v2_pokemon(limit: 21, offset: $offset) {
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
