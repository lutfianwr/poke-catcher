import Link from "next/link";
import React from "react";
import styles from "../styles/nav.module.scss";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <a className={styles.link} href="https://poke-room.netlify.app">
        <p>PokéRoom</p>
      </a>
      <Link href="/myPokemon" replace={true}>
        MyPokémon
      </Link>
    </nav>
  );
};

export default Header;
