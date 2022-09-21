import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Pokemon } from "../components/Pokemon";
import { GET_POKEMONS } from "../graphql/get-pokemon";

export function PokemonsContainer() {
  const { data: { getFuzzyPokemon = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: { pokemon: "charmander", page: 0 },
  });

  return (
    <div className="pokemons flex-container">
      {getFuzzyPokemon.map((pokemon) => (
        <Pokemon key={pokemon.key} name={pokemon.key} sprite={pokemon.sprite} />
      ))}
    </div>
  );
}
