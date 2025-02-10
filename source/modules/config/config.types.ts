// values used to start a new game
export interface Config {
    columns: number;
    lines: number;
    imagesUsed: number;
}

export type PartialConfig = Partial<Config>;
