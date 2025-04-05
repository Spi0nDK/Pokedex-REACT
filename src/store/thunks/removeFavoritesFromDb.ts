import { AppDispatch } from "../store";
import { removeFavorite } from "../slices/pokemonSlice";

export const removeFavoriteFromDb = (pokemonId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/favorites?dex=${pokemonId}`);
        const data = await response.json();

        const pokemonToDelete = data[0];
        const res = await fetch(`http://localhost:5000/favorites/${pokemonToDelete.id}`, {
            method: "DELETE",
        });
        console.log(res);
        if (res.ok) {
            dispatch(removeFavorite(pokemonId));
        }
    } catch (err) {
        console.error("Kunne ikke fjerne favorite:", err);
    }
};
