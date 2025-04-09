export interface PokemonType {
    name: string;
}

export interface PokemonDetails {
    name: string;
    dex: number;
    types: PokemonType[];
    stats: { name: string; value: number }[];
    moves: { name: string }[];
    sprite: string;
    shiny: string;
}
