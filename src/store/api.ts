const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

export const fetchPokemons = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon list');
        }
        const data = await response.json();

        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon: { url: string }) => {
                const detailsResponse = await fetch(pokemon.url);
                if (!detailsResponse.ok) {
                    throw new Error(`Failed to fetch details for ${pokemon.url}`);
                }
                const details = await detailsResponse.json();

                return {
                    id: details.id,
                    name: details.name,
                    image: details.sprites.front_default,
                    stats: details.stats.map((stat: any) => ({
                        name: stat.stat.name,
                        value: stat.base_stat,
                    })),
                    types: details.types.map((type: any) => type.type.name),
                };
            })
        );

        return detailedPokemons;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return [];
    }
};
