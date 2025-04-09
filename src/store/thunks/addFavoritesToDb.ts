import { AppDispatch } from "../store";
import { addFavorite } from "../slices/pokemonSlice";
import { PokemonDetails } from "../../types/interfaces.ts";

export const addFavoriteToDb = (pokemon: PokemonDetails) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch("http://localhost:5000/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemon),
        });

        if (res.ok) {
            dispatch(addFavorite(pokemon));
        }
    } catch (err) {
        console.error("Kunne ikke tilføje favorite:", err);
    }
};