import type { Opaque } from 'ts-essentials';

import type { Config } from '../config';

export type TilesData = {
    [id: GridPositionId]: {
        state: GridPositionState;
        imageName: string;
    };
};

export type GameState = {
    tiles: TilesData;
    grid: GridPosition[][];
    selected1: GridPositionId | null;
    selected2: GridPositionId | null;
    matchedTiles: number;
    guessesCount: number;
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
