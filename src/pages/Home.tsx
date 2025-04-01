import Navbar from "../components/Navbar.tsx";
import "./Home.css";
import PokemonList from "../components/PokemonList.tsx";

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1>National Pokedex</h1>
            <PokemonList />
        </div>
    );
}