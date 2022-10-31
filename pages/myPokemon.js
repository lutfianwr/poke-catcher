import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/index.module.scss";

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
        <div className={styles.main}>
          <div className={styles.flex_container}>
            {datas.map((data) => (
              <Link
                href={`pokemon/${data.species.toLowerCase()}`}
                key={data.id}
              >
                <div className={styles.pokemon}>
                  <div className={styles.my_pokemon_name}>
                    {/* <p>{data.nickname}</p>
                  <span>Lv. {data.level}</span> */}
                  </div>
                  <div className={styles.pokemon_sprite}>
                    <Image
                      alt=""
                      layout="fixed"
                      width={150}
                      height={150}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.num}.png`}
                    />
                  </div>
                  <div className={styles.pokemon_name}>
                    <p>#{data.num}</p>
                    <span>{data.species}</span>
                  </div>
                  <div className={styles.pokemon_type}>
                    {data.types.length < 2 ? (
                      <div className={styles.type}>
                        <p className={styles[data.types[0].toLowerCase()]}>
                          {data.types[0]}
                        </p>
                      </div>
                    ) : (
                      <div className={styles.type}>
                        <p className={styles[data.types[0].toLowerCase()]}>
                          {data.types[0]}
                        </p>
                        <p className={styles[data.types[1].toLowerCase()]}>
                          {data.types[1]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
};
export default MyPokemon;
