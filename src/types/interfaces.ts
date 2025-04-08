export interface PokemonType {
    name: string;
}

export interface PokemonDetails {
    name: string;
    dex: number;
    types: PokemonType[];
    sprite: string;
    shiny: string;
}
