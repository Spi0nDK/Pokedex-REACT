import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDetails } from '../types/interfaces';

const pokemonApi = createApi({
    reducerPath: 'pokemon',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2/'
    }),
    endpoints: (builder) => ({
        fetchPokemons: builder.query<any, void>({
            query: () => {
                return {
                    url: 'pokemon',
                    params: { limit: 1025 },
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
                    stats: response.stats.map((stat: any) => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    })),
                    moves: response.moves.map((move: any) => ({
                        name: move.move.name
                    })),
                    sprite: response.sprites.other?.home?.front_default,
                    shiny: response.sprites.other?.home?.front_shiny,
                };
            }
        })
    })
});

export const { useFetchPokemonsQuery, useFetchPokemonDetailsQuery } = pokemonApi;
export { pokemonApi };
