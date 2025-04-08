import { useFetchPokemonDetailsQuery } from "../store/api.ts";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {addFavoriteToDb} from "../store/thunks/addFavoritesToDb.ts";
import {removeFavoriteFromDb} from "../store/thunks/removeFavoritesFromDb.ts";


interface PokemonDetailsProps {
    pokemonUrl: string;
}

const typeColors: { [key: string]: string } = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    normal: '#A8A878',
    flying: '#A890F0',
};

const properCase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const PokemonDetails = ({ pokemonUrl }: PokemonDetailsProps) => {
    const { data: details, isLoading } = useFetchPokemonDetailsQuery(pokemonUrl);
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.favorites.data);

    if (isLoading) return <div>Loading {pokemonUrl}...</div>;
    if (!details) return <div>Ingen data fundet.</div>;

    const isFavorited = favorites.some(pokemon => pokemon.dex === details.dex);

    const handleAddToFavorites = () => {
        if (isFavorited) {
            dispatch(removeFavoriteFromDb(details.dex));
        } else {
            dispatch(addFavoriteToDb({
                name: details.name,
                dex: details.dex,
                sprite: details.sprite,
                types: details.types,
            }));
        }
    };

    return(
        <div className="pokemon-card">
            <button className={`favorite-btn ${isFavorited ? "favorited" : ""}`} onClick={handleAddToFavorites}>⭐</button>
            <img src={details.sprite} alt={details.name}/>
            <p>#{details.dex.toString().padStart(4, '0')}</p>
            <p>{properCase(details.name)}</p>
            <div className="types">
                {details.types.map((type) => (
                    <span key={type.name} className="type" style={{backgroundColor: typeColors[type.name] || '#777'}}>
                        {properCase(type.name)}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default PokemonDetails;