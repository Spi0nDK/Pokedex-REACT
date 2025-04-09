import { useFetchPokemonDetailsQuery } from "../store/api.ts";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {addFavoriteToDb} from "../store/thunks/addFavoritesToDb.ts";
import {removeFavoriteFromDb} from "../store/thunks/removeFavoritesFromDb.ts";
import {properCase} from "../utils/stringUtils.ts";
import {typeColors} from "../utils/typeColors.ts";
import {useNavigate} from "react-router";

interface PokemonDetailsProps {
    pokemonUrl: string;
}

const PokemonDetails = ({ pokemonUrl }: PokemonDetailsProps) => {
    const { data: details, isLoading } = useFetchPokemonDetailsQuery(pokemonUrl);
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.favorites.data);
    const navigate = useNavigate();

    if (isLoading) return <div>Loading {pokemonUrl}...</div>;
    if (!details) return <div>Ingen data fundet.</div>;

    const isFavorited = favorites.some(pokemon => pokemon.dex === details.dex);

    const handleAddToFavorites = (event: React.MouseEvent) => {

        event.stopPropagation();

        if (isFavorited) {
            dispatch(removeFavoriteFromDb(details.dex));
        } else {
            dispatch(addFavoriteToDb({
                name: details.name,
                dex: details.dex,
                types: details.types,
                stats: details.stats,
                moves: details.moves,
                sprite: details.sprite,
                shiny: details.shiny,
            }));
        }
    };

    const handleClick = () => {
        navigate(`/pokemon/${details.name}`);
    }

    return(
        <div className="pokemon-card" onClick={handleClick}>
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