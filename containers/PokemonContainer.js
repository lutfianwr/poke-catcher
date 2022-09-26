import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Pokemon } from "../components/Pokemon";
import { GET_POKEMONS } from "../graphql/get-pokemon";

export function PokemonsContainer(page) {
  const { data: { pokemon_v2_pokemon = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: { offset: page.page },
  });

  return (
    <div className="pokemons flex-container">
      {console.log(pokemon_v2_pokemon)}
      {pokemon_v2_pokemon.map((pokemon) => (
        <Pokemon
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          type={pokemon.pokemon_v2_pokemontypes}
          sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        />
      ))}
    </div>
  );
}
