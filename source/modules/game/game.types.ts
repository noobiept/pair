import type { Opaque } from 'ts-essentials';

import type { Config } from '../config';

export type TilesData = {
    [id: GridPositionId]: {
        state: GridPositionState;
        imageName: string;
    };
};

export type GameState = {
    generated: Date; // last time the game was generated
    tiles: TilesData; // all tiles in the game
    grid: GridPosition[][]; // tiles organized in a grid
    selected1: GridPositionId | null; // first selected tile
    selected2: GridPositionId | null; // second selected tile
    matchedTiles: number; // number of matched tiles
    guessesCount: number; // number of guesses made
};

type SelectTileAction = {
    type: 'game/select-tile';
    payload: {
        id: GridPositionId;
    };
};

type ResetGridAction = {
    type: 'game/reset-grid';
    payload: {
        config: Config;
    };
};

type ResetSelectionAction = {
    type: 'game/reset-selection';
};

export type GameAction =
    | SelectTileAction
    | ResetGridAction
    | ResetSelectionAction;

export type GridPosition = {
    imageName: string;
    id: GridPositionId;
};

export type GridPositionId = Opaque<string, 'grid-position-id'>;

type GridPositionState = 'hidden' | 'visible' | 'matched';
