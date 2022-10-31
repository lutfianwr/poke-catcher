import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "../styles/index.module.scss";

export function Pokemon(pokemon) {
  return (
    <Link href={`pokemon/${pokemon.name.split(`-`)[0].replace(/[^\w ]/g, "")}`}>
      <div className={styles.pokemon}>
        <div className={styles.pokemon_sprite}>
          <Image
            alt=""
            layout="fixed"
            width={150}
            height={150}
            src={pokemon.sprite}
          />
        </div>
        <div className={styles.pokemon_name}>
          <p>#{pokemon.id}</p>
          <span>{pokemon.name.split(`-`)[0]}</span>
        </div>
        <div className={styles.pokemon_type}>
          {pokemon.type.length < 2 ? (
            <div className={styles.type}>
              <p className={styles[pokemon.type[0].pokemon_v2_type.name]}>
                {pokemon.type[0].pokemon_v2_type.name}
              </p>
            </div>
          ) : (
            <div className={styles.type}>
              <p className={styles[pokemon.type[0].pokemon_v2_type.name]}>
                {pokemon.type[0].pokemon_v2_type.name}
              </p>
              <p className={styles[pokemon.type[1].pokemon_v2_type.name]}>
                {pokemon.type[1].pokemon_v2_type.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
