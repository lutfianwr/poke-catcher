import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const MyPokemon = () => {
  const [datas, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const datas = localStorage.getItem("myPokemon");
    const tempData = JSON.parse(datas);
    setData(tempData);
    console.log(tempData);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <div className="loading">loading</div>;
  } else if (datas == null) {
    return (
      <Layout>
        <div className="loading">you have not catch any pokemon</div>;
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="my_pokemon">
          {datas.map((data) => (
            <Link href={`pokemon/${data.species.toLowerCase()}`} key={data.id}>
              <div className="pokemon">
                <div className="my_pokemon_name">
                  {/* <p>{data.nickname}</p>
                  <span>Lv. {data.level}</span> */}
                </div>
                <div className="pokemon_sprite">
                  <Image
                    alt=""
                    layout="fixed"
                    width={150}
                    height={150}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.num}.png`}
                  />
                </div>
                <div className="pokemon_name">
                  <p>#{data.num}</p>
                  <span>{data.species}</span>
                </div>
                <div className="pokemon_type">
                  {data.types.length < 2 ? (
                    <div className="type">
                      <p className={data.types[0]}>{data.types[0]}</p>
                    </div>
                  ) : (
                    <div className="type">
                      <p className={data.types[0]}>{data.types[0]}</p>
                      <p className={data.types[1]}>{data.types[1]}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    );
  }
};
export default MyPokemon;
