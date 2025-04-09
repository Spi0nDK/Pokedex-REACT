import {useParams} from "react-router";
import {useFetchPokemonDetailsQuery} from "../store/api.ts";
import "./Pokemon.css";
import {properCase} from "../utils/stringUtils.ts";
import {useState} from "react";

const Pokemon = () => {
    const { id } = useParams();
    const { data: details, isLoading } = useFetchPokemonDetailsQuery(`pokemon/${id}`);
    const [hover, setHover] = useState(false);

    if (isLoading) return <div>Loading {id}...</div>;
    if (!details) return <div>Ingen data fundet.</div>;

    return (
        <div>
            <div className="items">
                <h1 className="pokemon">{properCase(details.name)} #{details.dex.toString().padStart(4, '0')}</h1>
                <img src={hover ? details.shiny : details.sprite} alt={details.name} className="sprite_front"
                     onMouseEnter={() => setHover(true)}
                     onMouseLeave={() => setHover(false)}
                />
                <div className="moveset">
                    <h2>Moveset</h2>
                    <ul>
                        {details.moves.map((move, index) => (
                            <li key={index}>{properCase(move.name)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pokemon;