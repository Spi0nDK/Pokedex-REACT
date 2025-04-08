import {useParams} from "react-router";
import {useFetchPokemonDetailsQuery} from "../store/api.ts";
import "./Pokemon.css";
import {properCase} from "../utils/stringUtils.ts";

const Pokemon = () => {
    const { id } = useParams();
    const { data: details, isLoading } = useFetchPokemonDetailsQuery(`pokemon/${id}`);

    if (isLoading) return <div>Loading {id}...</div>;
    if (!details) return <div>Ingen data fundet.</div>;

    return (
        <div>
            <h1>{properCase(details.name)} #{details.dex.toString().padStart(4, '0')}</h1>
            <img src={details.sprite} alt={details.name} className="sprite_front"/>
            <img src={details.shiny} alt={details.name} className="sprite_shiny"/>
            <h1></h1>
        </div>
    );
};

export default Pokemon;