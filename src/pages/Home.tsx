import "./Home.css";
import PokemonList from "../components/PokemonList.tsx";

export default function Home() {
    return (
        <div>
            <h1>National Pokedex</h1>
            <PokemonList />
        </div>
    );
}