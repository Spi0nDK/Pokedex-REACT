import { AppDispatch } from "../store.ts";
import { setFavorites } from "../slices/pokemonSlice.ts";

export const fetchFavoritesFromDb = () => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch("http://localhost:5000/favorites");
        const data = await res.json();
        dispatch(setFavorites(data));
    } catch (err) {
        console.error("Kunne ikke hente favorites:", err);
    }
};
