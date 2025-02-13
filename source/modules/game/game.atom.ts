import { atom } from 'jotai';
import { atomWithReducer, selectAtom } from 'jotai/utils';
import { configAtom, type Config } from '../config';
import { newGame, tileSelected } from './game-logic';
import type { GameAction, GameState, TilesData } from './game.types';

function gameReducer(state: GameState, action: GameAction) {
    switch (action.type) {
        case 'game/select-tile': {
            const newState = tileSelected(state, action.payload.id);

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
                ...state,
                tiles,
                grid,
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
        tiles: {},
        grid: [],
        selected1: null,
        selected2: null,
        matchedTiles: 0,
        guessesCount: 0,
    },
    gameReducer,
);

export const newGameAtom = atom(null, (get, set, config: Config) => {
    set(configAtom, config);
    set(gameStateAtom, {
        type: 'game/reset-grid',
        payload: {
            config,
        },
    });
});

export const gridAtom = selectAtom(gameStateAtom, (state) => state.grid);
