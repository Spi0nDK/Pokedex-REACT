import "./PokemonList.css";
import { useFetchPokemonsQuery } from "../store/api.ts";
import PokemonDetails from "./PokemonDetails.tsx";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import Footer from "./Footer.tsx";

const PokemonList = () => {
    const location = useLocation();
    const { data: pokemons, isLoading, error } = useFetchPokemonsQuery();
    const favorites = useSelector((state: RootState) => state.favorites.data);

    const isFavoritePage = location.pathname === "/favorite";

    if (isLoading) return <p>Loader Pokémons...</p>;
    if (error) return <p>Fejl med at load Pokémons.</p>

    const pokemonsToDisplay = isFavoritePage
        ? favorites.map((favorite) => ({ name: favorite.name, url: `https://pokeapi.co/api/v2/pokemon/${favorite.dex}/` }))
        : pokemons?.results;

    if (isFavoritePage && favorites.length === 0) {
        return <p>Du har ingen favorit Pokémon.</p>;
    }

    return (
        <div className="page-container">
            <div className="pokemons">
                {pokemonsToDisplay?.map((pokemon: { name: string; url: string }) => (
                    <PokemonDetails key={pokemon.name} pokemonUrl={pokemon.url} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default PokemonList;