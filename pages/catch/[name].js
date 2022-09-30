import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CatchName = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { name } = router.query;
  const [level, setLevel] = useState(0);

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
            num
            catchRate{
              percentageWithOrdinaryPokeballAtFullHealth
            }
            baseStats { hp }
        }
      }
    `,
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data.data.getPokemon))
      .then(() => setLevel((Math.random() * 99).toFixed(0)))
      .catch(() => setData(0))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <div className="loading">loading</div>;
  } else if (data == 0) {
    return <div className="loading">no data</div>;
  } else {
    return (
      <div className="catchpokemon">
        <div className="catchpokemon_info">
          <div className="catchpokemon_desc">
            <p className="catchpokemon_name">{data.species}</p>
            <p className="level">Lv{level}</p>
          </div>
          <div className="catchpokemon_hp">
            <div className="status" style={{ ["width"]: `100%` }}>
              <p>HP</p>
              <p>{data.baseStats.hp + level * 2}</p>
            </div>
          </div>
        </div>
        <div className="catchpokemon_sprite">
          <img
            className="image"
            alt=""
            src={
              data.num < 650
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.num}.gif`
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${data.num}.png`
            }
          />
        </div>
        <div className="catchpokemon_action">
          <p>Throw Pokeball</p>
          <p>Throw Berry</p>
          <p>Throw Stone</p>
          <p>Run</p>
        </div>
      </div>
    );
  }
};

export default CatchName;
