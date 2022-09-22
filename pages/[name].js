import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// require { Query } from "@favware/graphql-pokemon";

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
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <div className="loading">loading</div>;
  } else {
    return (
      <div className="pokemon_detail">
        <div className="pokemon_info">
          <div className="pokemon_sprite">
            <img className="image" src={data.sprite}></img>
          </div>
          <div className="pokemon_desc">
            <p className="pokemon_name">
              #{data.num} {data.species}
            </p>

            <div className="type">
              {data.types.map((type) => (
                <p className={type} key={type}>
                  {type}
                </p>
              ))}
            </div>
            <div className="desc">
              {data.flavorTexts[0] ? (
                <p>{data.flavorTexts[0].flavor}</p>
              ) : (
                <p>Unknown data</p>
              )}
            </div>
            <div className="size">
              <p>Height : {data.height} m</p>
              <p>Weight : {data.weight} kg</p>
            </div>
            <div className="pokemon_status">
              <p>HP</p>
              <div className="status_container">
                <div
                  className="status"
                  style={{ ["width"]: `${data.baseStats.hp * 0.25}%` }}
                >
                  {data.baseStats.hp}
                </div>
              </div>
              <p>Atk</p>
              <div className="status_container">
                <div
                  className="status"
                  style={{ ["width"]: `${data.baseStats.attack * 0.4}%` }}
                >
                  {data.baseStats.attack}
                </div>
              </div>
              <p>Def</p>
              <div className="status_container">
                <div
                  className="status"
                  style={{ ["width"]: `${data.baseStats.defense * 0.4}%` }}
                >
                  {data.baseStats.defense}
                </div>
              </div>
              <p>Sp Atk</p>
              <div className="status_container">
                <div
                  className="status"
                  style={{
                    ["width"]: `${data.baseStats.specialattack * 0.4}%`,
                  }}
                >
                  {data.baseStats.specialattack}
                </div>
              </div>

              <p>Sp Def</p>
              <div className="status_container">
                <div
                  className="status"
                  style={{
                    ["width"]: `${data.baseStats.specialdefense * 0.4}%`,
                  }}
                >
                  {data.baseStats.specialdefense}
                </div>
              </div>

              <p>Spd</p>
              <div className="status_container">
                <div
                  className="status"
                  style={{ ["width"]: `${data.baseStats.speed * 0.4}%` }}
                >
                  {data.baseStats.speed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonName;
