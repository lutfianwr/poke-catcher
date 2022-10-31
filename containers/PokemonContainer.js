import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Pokemon } from "../components/Pokemon";
import { GET_POKEMONS } from "../graphql/get-pokemon";
import styles from "../styles/index.module.scss";

export function PokemonsContainer(page) {
  const { data: { pokemon_v2_pokemon = [] } = {} } = useQuery(GET_POKEMONS, {
    variables: { offset: page.page, limit: page.limit },
  });

  return (
    <div className={styles.flex_container}>
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
