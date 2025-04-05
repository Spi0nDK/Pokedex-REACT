import "./PokemonList.css";
import { useFetchPokemonsQuery } from "../store/api.ts";
import PokemonDetails from "./PokemonDetails.tsx";

const PokemonList = () => {
    const { data: pokemons, isLoading, error } = useFetchPokemonsQuery();

    if (isLoading) return <p>Loader Pokémons...</p>;
    if (error) return <p>Fejl med at load Pokémons.</p>

    return (
        <div className="pokemons">
            {pokemons?.results.map((pokemon: { name: string; url: string }) => (
                <PokemonDetails key={pokemon.name} pokemonUrl={pokemon.url} />
            ))}
        </div>
    );
};

export default PokemonList;