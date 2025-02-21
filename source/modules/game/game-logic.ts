import { shuffle } from '@drk4/utilities';

import type { Config } from '../config';
import { IMAGES } from '../images';
import type { GameState, GridPosition, GridPositionId } from './game.types';
import { removeRandomElement } from './game.utils';

/**
 * Start a new game.
 */
export function newGame(config: Config) {
    const columnCount = config.columns;
    const lineCount = config.lines;
    let imagesUsed = config.imagesUsed;
    const totalTiles = columnCount * lineCount;
    const totalPairs = totalTiles / 2;

    if (totalTiles % 2 !== 0) {
        throw new Error(
            `Total number of tiles needs to be an even number. -- columnCount: ${columnCount} / lineCount: ${lineCount} / total (column * line): ${totalTiles}`,
        );
    }

    // trying to use more images than possible (given the columns/lines combination)
    if (imagesUsed > totalPairs) {
        imagesUsed = totalPairs;
    }

    // create the tiles
    const pairsPerImage = Math.floor(totalPairs / imagesUsed);
    let extraPairs = totalPairs % imagesUsed;
    const imagesCopy = IMAGES.slice();
    const tiles: GridPosition[] = [];

    for (let a = 0; a < imagesUsed; a++) {
        const imageName = removeRandomElement(imagesCopy);

        for (let b = 0; b < pairsPerImage; b++) {
            // need to add a pair each time
            tiles.push(
                {
                    imageName,
                    id: crypto.randomUUID() as GridPositionId,
                },
                {
                    imageName,
                    id: crypto.randomUUID() as GridPositionId,
                },
            );
        }

        // add an extra pair until there are no more extra
        if (extraPairs > 0) {
            tiles.push(
                { imageName, id: crypto.randomUUID() as GridPositionId },
                { imageName, id: crypto.randomUUID() as GridPositionId },
            );
            extraPairs--;
        }
    }

    shuffle(tiles);

    const grid = [];
    for (let i = 0; i < lineCount; i++) {
        const row = [];
        for (let j = 0; j < columnCount; j++) {
            row.push(tiles[i * columnCount + j]);
        }
        grid.push(row);
    }

    return grid;
}

function isAlreadyVisible(state: GameState, id: GridPositionId) {
    return state.tiles[id].state !== 'hidden';
}

function isAMatch(state: GameState, id1: GridPositionId, id2: GridPositionId) {
    return state.tiles[id1].imageName === state.tiles[id2].imageName;
}

/**
 * A Tile was selected (clicked on). If its the first one being selected keep track of it, otherwise compare with the previously selected tile to see if its a match.
 */
export function tileSelected(state: GameState, id: GridPositionId) {
    // already visible/matched so can't be used anymore
    if (
        isAlreadyVisible(state, id) ||
        id === state.selected1 ||
        id === state.selected2
    ) {
        return null;
    }

    if (!state.selected1) {
        return {
            ...state,
            selected1: id,
            tiles: {
                ...state.tiles,
                [id]: {
                    ...state.tiles[id],
                    state: 'visible',
                },
            },
        };
    } else if (!state.selected2) {
        const selected1 = state.selected1;
        const selected2 = id;

        // a guess was made (2 tiles selected)
        const guessesCount = state.guessesCount + 1;

        // correct guess
        if (isAMatch(state, selected1, selected2)) {
            return {
                ...state,
                selected1: null,
                selected2: null,
                tiles: {
                    ...state.tiles,
                    [selected1]: {
                        ...state.tiles[selected1],
                        state: 'matched',
                    },
                    [selected2]: {
                        ...state.tiles[selected2],
                        state: 'matched',
                    },
                },
                matchedTiles: state.matchedTiles + 2,
                guessesCount,
            };
            // invalid match
        } else {
            return {
                ...state,
                selected2: id,
                tiles: {
                    ...state.tiles,
                    [selected2]: {
                        ...state.tiles[selected2],
                        state: 'visible',
                    },
                },
                guessesCount,
            };
        }
    }

    return null;
}

export function isGameOver(game: GameState, config: Config) {
    return game.matchedTiles >= config.columns * config.lines;
}

export function calcScore(game: GameState, config: Config) {
    if (game.guessesCount === 0) {
        return 0;
    }

    const totalPairs = (config.columns * config.lines) / 2;
    const score = Math.round((totalPairs / game.guessesCount) * 100);

    return score;
}
