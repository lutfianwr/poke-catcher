import React, { useState } from "react";
import { PokemonsContainer } from "../containers/PokemonContainer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function Home() {
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const myclient = new ApolloClient({
    uri: "https://graphqlpokemon.favware.tech/",
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
      <main>
        <PokemonsContainer page={page} />
        <div>
          <div className="pagination">
            <a className="pagination_item">
              <button onClick={() => handlePrevPage()}>prev page</button>
            </a>
            <p className="pagination_item">{pageNumber}</p>
            <a className="pagination_item">
              <button onClick={() => handleNextPage()}>next page</button>
            </a>
          </div>
          <div className="pagination">
            <button
              onClick={() => (setPageNumber(1), setPage(0))}
              className="pagination_item"
            >
              1
            </button>
            <button
              onClick={() => (setPageNumber(20), setPage(399))}
              className="pagination_item"
            >
              20
            </button>
            <button
              onClick={() => (setPageNumber(40), setPage(819))}
              className="pagination_item"
            >
              40
            </button>
            <button
              onClick={() => (setPageNumber(60), setPage(1239))}
              className="pagination_item"
            >
              60
            </button>
          </div>
        </div>
      </main>
    </ApolloProvider>
  );
}
