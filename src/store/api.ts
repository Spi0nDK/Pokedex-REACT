import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDetails } from '../types/interfaces';

const pokemonApi = createApi({
    reducerPath: 'pokemon',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2/'
    }),
    endpoints: (builder) => ({
        fetchPokemons: builder.query({
            query: () => {
                return {
                    url: 'pokemon',
                    params: { limit: 20 },
                    method: 'GET'
                };
            }
        }),
        fetchPokemonDetails: builder.query<PokemonDetails, string>({
            query: (pokemonUrl: string) => ({
                url: pokemonUrl.replace('https://pokeapi.co/api/v2/', ''),
                method: 'GET'
            }),
            transformResponse: (response: any): PokemonDetails => {
                return {
                    name: response.name,
                    dex: response.id,
                    types: response.types.map((type: any) => ({ name: type.type.name })),
                    sprite: response.sprites.front_default,
                };
            }
        })
    })
});

export const { useFetchPokemonsQuery, useFetchPokemonDetailsQuery } = pokemonApi;
export { pokemonApi };
