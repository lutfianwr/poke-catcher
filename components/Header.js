import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="nav">
      <a href="https://poke-room.netlify.app">
        <p>PokéRoom</p>
      </a>
      <Link href={`myPokemon`}>MyPokémon</Link>
    </nav>
  );
};

export default Header;
