import React from "react";

const Trial = () => {
  const [data, setData] = React.useState([1]);

  //   React.useEffect(() => {
  //     fetchData();
  //   }, []);

  const getContent = () => {
    fetch("https://graphqlpokemon.favware.tech/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        getPokemon(pokemon: charander) {
            sprite
            types
            species
            num
        }
      }
    `,
      }),
    })
      .then((res) => res.json())
      .then((data) => setData(data.data.getPokemon))
      .catch(() => setData(1))
      .finally(() => console.log(data));
    // setStart(true);
    // if (start == true) {
    //   return <div>no data</div>;
    // } else {
    //   return <div>{data.types}</div>;
    // }
  };

  return (
    <div>
      <button onClick={() => getContent()}>fetch</button>
      <div>{data != 0 ? data.types : data == [1] ? `unavailable` : `new`}</div>
    </div>
  );
};

export default Trial;
