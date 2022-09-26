import Link from "next/link";
import React from "react";

export function Pokemon(pokemon) {
  return (
    <Link href={pokemon.name}>
      <div className="pokemon">
        <div className="pokemon_sprite">
          <img src={pokemon.sprite} alt="" />
        </div>
        <div className="pokemon_name">
          <p>#{pokemon.id}</p>
          <p>{pokemon.name}</p>
        </div>
        <div className="pokemon_type">
          {pokemon.type.length < 2 ? (
            <p>{pokemon.type[0].pokemon_v2_type.name}</p>
          ) : (
            <div className="dual_type">
              <p>{pokemon.type[0].pokemon_v2_type.name}</p>
              <p>{pokemon.type[1].pokemon_v2_type.name}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
