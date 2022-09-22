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
          <p>{pokemon.name}</p>
        </div>
      </div>
    </Link>
  );
}
