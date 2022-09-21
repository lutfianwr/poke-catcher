import React from "react";
import Image from "next/image";

export function Pokemon(pokemon) {
  return (
    <div className="pokemon">
      {console.log(pokemon)}
      <div className="pokemon_sprite">
        <img src={pokemon.sprite} alt=""></img>
      </div>
      <div className="pokemon_name">
        <p>{pokemon.name}</p>
      </div>
    </div>
  );
}
