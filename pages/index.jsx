import React, { useState } from "react";
import { PokemonsContainer } from "../containers/PokemonContainer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(151);
  const [pageNumber, setPageNumber] = useState(1);

  const myclient = new ApolloClient({
    uri: "https://beta.pokeapi.co/graphql/v1beta",
    cache: new InMemoryCache(),
  });

  const handleNextPage = () => {
    if (pageNumber < 60) {
      setPage(page + 21);
      setPageNumber(pageNumber + 1);
    }
  };
  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPage(page - 21);
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <ApolloProvider client={myclient}>
      <Head>
        <title>Poké Room</title>
        <meta name="pokédex app" content="pokédex application" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <main>
          <PokemonsContainer page={page} limit={limit} />
          <div>
            <div className="pagination">
              <p className="pagination_item">generation {pageNumber}</p>
            </div>
            <div className="pagination">
              <button
                onClick={() => (setPageNumber(1), setPage(0), setLimit(151))}
                className="pagination_item"
              >
                1
              </button>
              <button
                onClick={() => (setPageNumber(2), setPage(151), setLimit(100))}
                className="pagination_item"
              >
                2
              </button>
              <button
                onClick={() => (setPageNumber(3), setPage(251), setLimit(134))}
                className="pagination_item"
              >
                3
              </button>
              <button
                onClick={() => (setPageNumber(4), setPage(386), setLimit(107))}
                className="pagination_item"
              >
                4
              </button>
              <button
                onClick={() => (setPageNumber(5), setPage(494), setLimit(155))}
                className="pagination_item"
              >
                5
              </button>
              <button
                onClick={() => (setPageNumber(6), setPage(650), setLimit(159))}
                className="pagination_item"
              >
                6
              </button>
              <button
                onClick={() => (setPageNumber(7), setPage(810), setLimit(88))}
                className="pagination_item"
              >
                7
              </button>
            </div>
          </div>
        </main>
      </Layout>
    </ApolloProvider>
  );
}
