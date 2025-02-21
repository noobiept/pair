import { atomWithReducer, selectAtom } from 'jotai/utils';

import type { GameAction, GameState, TilesData } from './game.types';
import { newGame, tileSelected } from './game-logic';

function gameReducer(state: GameState, action: GameAction) {
    switch (action.type) {
        case 'game/select-tile': {
            const newState = tileSelected(state, action.payload.id);
            if (!newState) {
                return state;
            }

            return {
                ...state,
                ...newState,
            };
        }

        case 'game/reset-grid': {
            const grid = newGame(action.payload.config);
            const tiles = grid.flat().reduce<TilesData>((acc, tile) => {
                acc[tile.id] = {
                    imageName: tile.imageName,
                    state: 'hidden',
                };
                return acc;
            }, {});

            return {
                generated: new Date(),
                tiles,
                grid,
                selected1: null,
                selected2: null,
                matchedTiles: 0,
                guessesCount: 0,
            };
        }

        case 'game/reset-selection': {
            const selected1 = state.selected1;
            const selected2 = state.selected2;

            return {
                ...state,
                selected1: null,
                selected2: null,
                tiles: {
                    ...state.tiles,
                    ...(selected1 !== null && {
                        [selected1]: {
                            ...state.tiles[selected1],
                            state: 'hidden',
                        },
                    }),
                    ...(selected2 !== null && {
                        [selected2]: {
                            ...state.tiles[selected2],
                            state: 'hidden',
                        },
                    }),
                },
            };
        }

        default:
            return state;
    }
}

export const gameStateAtom = atomWithReducer<GameState, GameAction>(
    {
        generated: new Date(),
        tiles: {},
        grid: [],
        selected1: null,
        selected2: null,
        matchedTiles: 0,
        guessesCount: 0,
    },
    gameReducer,
);

export const gridAtom = selectAtom(gameStateAtom, (state) => state.grid);

export const guessesCountAtom = selectAtom(
    gameStateAtom,
    (state) => state.guessesCount,
);

export const generatedTimeAtom = selectAtom(gameStateAtom, (state) =>
    state.generated.getTime(),
);
