import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/pokemon.module.scss";

const PokemonName = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    await fetch("https://graphqlpokemon.favware.tech/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        getPokemon(pokemon: ${name}) {
            sprite
            types
            species
            baseStats { hp attack defense specialattack specialdefense speed }
            height
            weight
            flavorTexts { game flavor }
            num
        }
      }
    `,
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data.data.getPokemon))
      .catch(() => setData(0))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <div className="loading">loading</div>;
  } else if (data == 0) {
    return <div className="loading">no data</div>;
  } else {
    return (
      <Layout>
        <div className={styles.pokemon_detail}>
          <div className={styles.pokemon_info}>
            <div className={styles.pokemon_sprite}>
              <img
                className={styles.image}
                alt=""
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${data.num}.png`}
              />
            </div>
            <div className={styles.pokemon_desc}>
              <p className={styles.pokemon_name}>
                #{data.num} {data.species}
              </p>

              <div className={styles.type}>
                {data.types.map((type) => (
                  <p className={styles[type]} key={type}>
                    {type}
                  </p>
                ))}
              </div>
              <div className={styles.desc}>
                {data.flavorTexts[0] ? (
                  <p>{data.flavorTexts[0].flavor}</p>
                ) : (
                  <p>Unknown data</p>
                )}
              </div>
              <div className={styles.size}>
                <p>Height : {data.height} m</p>
                <p>Weight : {data.weight} kg</p>
              </div>
              <div className={styles.pokemon_status}>
                <p>HP</p>
                <div className={styles.status_container}>
                  <div
                    className={styles.status}
                    style={{ ["width"]: `${data.baseStats.hp * 0.25}%` }}
                  >
                    {data.baseStats.hp}
                  </div>
                </div>
                <p>Atk</p>
                <div className={styles.status_container}>
                  <div
                    className={styles.status}
                    style={{ ["width"]: `${data.baseStats.attack * 0.4}%` }}
                  >
                    {data.baseStats.attack}
                  </div>
                </div>
                <p>Def</p>
                <div className={styles.status_container}>
                  <div
                    className={styles.status}
                    style={{ ["width"]: `${data.baseStats.defense * 0.4}%` }}
                  >
                    {data.baseStats.defense}
                  </div>
                </div>
                <p>Sp Atk</p>
                <div className={styles.status_container}>
                  <div
                    className={styles.status}
                    style={{
                      ["width"]: `${data.baseStats.specialattack * 0.4}%`,
                    }}
                  >
                    {data.baseStats.specialattack}
                  </div>
                </div>

                <p>Sp Def</p>
                <div className={styles.status_container}>
                  <div
                    className={styles.status}
                    style={{
                      ["width"]: `${data.baseStats.specialdefense * 0.4}%`,
                    }}
                  >
                    {data.baseStats.specialdefense}
                  </div>
                </div>

                <p>Spd</p>
                <div className={styles.status_container}>
                  <div
                    className={styles.status}
                    style={{ ["width"]: `${data.baseStats.speed * 0.4}%` }}
                  >
                    {data.baseStats.speed}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.catch}>
            <Link href={`/catch/${data.species}`} replace>
              <button>catch</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
};

export default PokemonName;
