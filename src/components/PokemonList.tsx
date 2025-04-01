import { useState, useEffect } from "react";

import { fetchPokemons } from "../store/api";
import "./PokemonList.css";

interface Pokemon {
    id: number;
    name: string;
    image: string;
    stats: { name: string, value: number }[];
    types: string[];
}

const typeColors: { [key: string]: string } = {
    fire: '#F08030',        // Fire
    water: '#6890F0',       // Water
    grass: '#78C850',       // Grass
    electric: '#F8D030',    // Electric
    psychic: '#F85888',     // Psychic
    ice: '#98D8D8',         // Ice
    dragon: '#7038F8',      // Dragon
    dark: '#705848',        // Dark
    fairy: '#EE99AC',       // Fairy
    fighting: '#C03028',    // Fighting
    poison: '#A040A0',      // Poison
    ground: '#E0C068',      // Ground
    rock: '#B8A038',        // Rock
    bug: '#A8B820',         // Bug
    ghost: '#705898',       // Ghost
    steel: '#B8B8D0',       // Steel
    normal: '#A8A878',      // Normal
    flying: '#A890F0',      // Flying
};

const properCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const PokemonList = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function loadPokemons() {
            const data = await fetchPokemons();
            setPokemons(data);
        }
        loadPokemons();
    }, []);

    return (
        <div>
            {/*<Link to="/navbar">Navbar</Link>*/}
            <ul className="pokemons">
                {pokemons.map((pokemon) => (
                    <li className="pokemon" key={pokemon.id}>
                        <button className="favorite-btn">⭐</button>
                        <img src={pokemon.image} alt={pokemon.name}/>
                        <p>#{pokemon.id.toString().padStart(4, '0')}</p>
                        <p>{properCase(pokemon.name)}</p>

                        {/* Type */}
                        <div className="types">
                            {pokemon.types.map((type) => (
                                <span key={type} className="type" style={{ backgroundColor: typeColors[type.toLowerCase()] }}>
                                    {properCase(type)}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonList;