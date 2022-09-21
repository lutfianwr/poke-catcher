import React from "react";
import { PokemonsContainer } from "../containers/PokemonContainer";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export default function Home() {
  const myclient = new ApolloClient({
    uri: "https://graphqlpokemon.favware.tech/",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={myclient}>
      <main>
        <PokemonsContainer />
      </main>
    </ApolloProvider>
  );
}
