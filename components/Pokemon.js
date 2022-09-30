import Link from "next/link";
import React from "react";
import Image from "next/image";

export function Pokemon(pokemon) {
  return (
    <Link href={`pokemon/${pokemon.name.replace(/[^\w ]/g, "")}`}>
      <div className="pokemon">
        <div className="pokemon_sprite">
          <Image
            alt=""
            layout="fixed"
            width={150}
            height={150}
            src={pokemon.sprite}
          />
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
