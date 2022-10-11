import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CatchName = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { name } = router.query;
  const [level, setLevel] = useState(0);
  const [hitpoint, setHitpoint] = useState(0);
  const [maxhitpoint, setmaxHitpoint] = useState(0);
  const [catchRate, setcatchRate] = useState(0);
  const [weak, setWeak] = useState(false);
  const [evasive, setEvasive] = useState(60);

  useEffect(() => {
    fetchData();
  }, []);

  const handleThrowPokeball = () => {
    let chance = Math.floor(Math.random() * (0 + 100) + 10);
    if (chance < catchRate) {
      alert(`${data.species} caught!`);
      Router.replace("/");
    } else {
      alert(`${data.species} broke the pokeball!`);
    }
  };

  const handleThrowStone = () => {
    let chance = Math.floor(Math.random() * (0 + 100));
    if (chance < evasive) {
      let damage = Math.floor(Math.random() * (15 - 8) + 10);
      if (hitpoint - damage > 0) {
        setHitpoint(hitpoint - damage);
        setcatchRate(parseFloat((catchRate = catchRate + 40 / level)));
        document.getElementById("sprite").className = "damaged";
        setTimeout(() => {
          document.getElementById("sprite").className = "image";
        }, 500);
        if ((hitpoint / maxhitpoint) * 100 < 55 && weak == false) {
          setcatchRate(parseFloat((catchRate = catchRate + 15)));
          setWeak(true);
        }
        if ((hitpoint / maxhitpoint) * 100 < 20 && weak == true) {
          setcatchRate(parseFloat((catchRate = catchRate + 25)));
        }
      } else if (hitpoint - damage <= 0) {
        setHitpoint(0);
        alert(`${name} fainted`);
        Router.replace("/");
      }
    } else {
      alert(`throw missed!`);
    }
  };

  const handleThrowBerry = () => {
    alert(`${name} eat the berry!`);
    setEvasive(evasive + 20);
  };

  const handleRun = () => {
    alert(`run away safely`);
    Router.replace("/");
  };

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
      <div
        className="catchpokemon"
        onLoad={() => {
          setHitpoint(data.baseStats.hp + level * 2),
            setmaxHitpoint(data.baseStats.hp + level * 2),
            setcatchRate(
              data.catchRate.percentageWithOrdinaryPokeballAtFullHealth
            );
        }}
      >
        <div className="catchpokemon_info">
          <div className="catchpokemon_desc">
            <p className="catchpokemon_name">{data.species}</p>
            <p className="level">Lv{level}</p>
            {/* <p className="level">{catchRate}</p> */}
          </div>
          <div className="catchpokemon_hp">
            <div
              className="status"
              style={{
                ["width"]: `${(hitpoint / maxhitpoint) * 100}%`,
              }}
            >
              <p>HP</p>
              <p>{hitpoint}</p>
            </div>
          </div>
        </div>
        <div className="catchpokemon_sprite">
          <img
            id="sprite"
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
          <div>
            <a onClick={() => handleThrowPokeball()} className="mx-2">
              <p>Throw Pokeball</p>
            </a>
            <a onClick={() => handleThrowBerry()}>
              <p>Throw Berry</p>
            </a>
          </div>
          <div>
            <a onClick={() => handleThrowStone()}>
              <p>Throw Stone</p>
            </a>
            <a onClick={() => handleRun()}>
              <p>Run</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default CatchName;
