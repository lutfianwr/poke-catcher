import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query getFuzzyPokemon($pokemon: String!, $page: Int!) {
    getFuzzyPokemon(pokemon: $pokemon, offset: $page, take: 21) {
      num
      key
      sprite
    }
  }
`;
