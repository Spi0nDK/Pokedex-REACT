import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { PokemonDetails } from "../../types/interfaces";

interface FavoritesState {
    data: PokemonDetails[];
}

const initialState: FavoritesState = {
    data: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites(state, action: PayloadAction<PokemonDetails[]>) {
            state.data = action.payload;
        },

        addFavorite (state, action: PayloadAction<PokemonDetails>) {
            const newPokemon = {
                ...action.payload,
            };
            state.data.push(newPokemon);
        },

        removeFavorite(state, action) {
            const pokemonId = action.payload;
            console.log(pokemonId);
            state.data = state.data.filter(pokemon => pokemon.dex !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
