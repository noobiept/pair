import { describe, expect, test } from 'vitest';

import type { Config } from '../config';
import type {
    GameState,
    GridPosition,
    GridPositionId,
    TilesData,
} from './game.types';
import { calcScore, isGameOver, newGame, tileSelected } from './game-logic';

function createGameState(positions: GridPosition[]): GameState {
    return {
        grid: [positions],
        selected1: null,
        selected2: null,
        matchedTiles: 0,
        guessesCount: 0,
        tiles: positions.reduce<TilesData>((acc, position) => {
            acc[position.id] = {
                imageName: position.imageName,
                state: 'hidden',
            };
            return acc;
        }, {}),
    };
}

function selectTiles(state: GameState, ids: GridPositionId[]) {
    return ids.reduce((acc, id) => {
        const newState = tileSelected(acc, id);

        if (newState) {
            return newState;
        }
        return acc;
    }, state);
}

describe(newGame.name, () => {
    function countDifferentImagesUsed(grid: ReturnType<typeof newGame>) {
        const pairs: { [key: string]: number } = {};
        grid.forEach((line) => {
            line.forEach((tile) => {
                pairs[tile.imageName] = (pairs[tile.imageName] ?? 0) + 1;
            });
        });
        return Object.keys(pairs).length;
    }

    function countTotalTiles(grid: ReturnType<typeof newGame>) {
        return grid.reduce((acc, line) => acc + line.length, 0);
    }

    test('should return a grid with the correct number of tiles', () => {
        const config = {
            lines: 10,
            columns: 8,
            imagesUsed: 4,
        };
        const grid = newGame(config);

        expect(grid).toHaveLength(config.lines);
        expect(grid[0]).toHaveLength(config.columns);
        expect(countTotalTiles(grid)).toBe(config.lines * config.columns);
    });

    test('should return a grid with the correct number of different images', () => {
        // on the limit (5x4 => 20 tiles / 10 different pairs)
        const config = {
            lines: 5,
            columns: 4,
            imagesUsed: 10,
        };
        const grid = newGame(config);
        const pairs = countDifferentImagesUsed(grid);
        expect(pairs).toBe(config.imagesUsed);
    });

    test('the number of images used can only be up to the number of pairs', () => {
        const config = {
            lines: 5,
            columns: 4,
            imagesUsed: 11, // over the limit
        };
        const grid = newGame(config);
        const pairs = countDifferentImagesUsed(grid);
        expect(pairs).toBe((config.lines * config.columns) / 2);
    });

    test('should throw an error if the number of tiles is odd', () => {
        const config = {
            lines: 5,
            columns: 5,
            imagesUsed: 10,
        };
        expect(() => newGame(config)).toThrow();
    });

    test('should add extra pairs when the pairs/images is not even', () => {
        const config = {
            lines: 5,
            columns: 4,
            imagesUsed: 3,
        };
        const grid = newGame(config);
        const pairs = countDifferentImagesUsed(grid);
        expect(pairs).toBe(config.imagesUsed);
        expect(countTotalTiles(grid)).toBe(config.lines * config.columns);
    });
});

describe(tileSelected.name, () => {
    test('should be able to select a tile when nothing is selected', () => {
        const positions = [
            { id: 'id1', imageName: 'image1' },
            { id: 'id2', imageName: 'image1' },
        ] as GridPosition[];
        const state = createGameState(positions);

        expect(tileSelected(state, positions[0].id)).toEqual({
            grid: [
                [
                    { imageName: 'image1', id: 'id1' },
                    { imageName: 'image1', id: 'id2' },
                ],
            ],
            selected1: 'id1',
            selected2: null,
            matchedTiles: 0,
            guessesCount: 0,
            tiles: {
                id1: { imageName: 'image1', state: 'visible' },
                id2: { imageName: 'image1', state: 'hidden' },
            },
        });
    });

    test("shouldn't be allowed to select an already visible or selected tile", () => {
        const positions = [
            {
                id: 'id1',
                imageName: 'image1',
            },
            { id: 'id2', imageName: 'image1' },
            { id: 'id3', imageName: 'image2' },
            { id: 'id4', imageName: 'image2' },
        ] as GridPosition[];
        let state: GameState | null = createGameState(positions);

        // make a pair (id1, id2) and select another (id3)
        state = selectTiles(state, ['id1', 'id2', 'id3'] as GridPositionId[]);

        // should fail to select a visible tile
        expect(tileSelected(state, positions[0].id)).toBeNull();
        expect(tileSelected(state, positions[1].id)).toBeNull();

        // should fail to select an already selected tile
        expect(tileSelected(state, positions[2].id)).toBeNull();
    });

    test('should increase guesses and the matched count after a valid match', () => {
        const positions = [
            { id: 'id1', imageName: 'image1' },
            { id: 'id2', imageName: 'image1' },
            { id: 'id3', imageName: 'image2' },
            { id: 'id4', imageName: 'image2' },
        ] as GridPosition[];
        let state: GameState | null = createGameState(positions);

        // make an valid pair
        state = selectTiles(state, ['id1', 'id2'] as GridPositionId[]);

        expect(state).toEqual({
            grid: [
                [
                    { imageName: 'image1', id: 'id1' },
                    { imageName: 'image1', id: 'id2' },
                    { imageName: 'image2', id: 'id3' },
                    { imageName: 'image2', id: 'id4' },
                ],
            ],
            selected1: null,
            selected2: null,
            matchedTiles: 2,
            guessesCount: 1,
            tiles: {
                id1: { imageName: 'image1', state: 'matched' },
                id2: { imageName: 'image1', state: 'matched' },
                id3: { imageName: 'image2', state: 'hidden' },
                id4: { imageName: 'image2', state: 'hidden' },
            },
        });
    });

    test('should increase the guesses but not the matched tiles after an invalid match', () => {
        const positions = [
            { id: 'id1', imageName: 'image1' },
            { id: 'id2', imageName: 'image1' },
            { id: 'id3', imageName: 'image2' },
            { id: 'id4', imageName: 'image2' },
        ] as GridPosition[];
        let state: GameState | null = createGameState(positions);

        // try to make an invalid pair (image1 with image2)
        state = selectTiles(state, ['id1', 'id3'] as GridPositionId[]);

        expect(state).toEqual({
            grid: [
                [
                    { imageName: 'image1', id: 'id1' },
                    { imageName: 'image1', id: 'id2' },
                    { imageName: 'image2', id: 'id3' },
                    { imageName: 'image2', id: 'id4' },
                ],
            ],
            selected1: 'id1',
            selected2: 'id3',
            matchedTiles: 0,
            guessesCount: 1,
            tiles: {
                id1: { imageName: 'image1', state: 'visible' },
                id2: { imageName: 'image1', state: 'hidden' },
                id3: { imageName: 'image2', state: 'visible' },
                id4: { imageName: 'image2', state: 'hidden' },
            },
        });
    });

    test("shouldn't do anything when we try to select another tile while 2 are already selected", () => {
        const positions = [
            { id: 'id1', imageName: 'image1' },
            { id: 'id2', imageName: 'image1' },
            { id: 'id3', imageName: 'image2' },
            { id: 'id4', imageName: 'image2' },
        ] as GridPosition[];
        let state: GameState | null = createGameState(positions);

        // select 2 tiles
        state = selectTiles(state, ['id1', 'id3'] as GridPositionId[]);

        // try to select another tile
        state = tileSelected(state, 'id4' as GridPositionId);

        expect(state).toBeNull();
    });
});

describe(isGameOver.name, () => {
    test("should return false when there's still unmatched tiles", () => {
        const config: Config = {
            lines: 4,
            columns: 4,
            imagesUsed: 1,
        };
        const ids = Array.from({ length: config.lines * config.columns }).map(
            (_, idx) => ({
                id: `id${idx}` as GridPositionId,
                imageName: `image1`,
            }),
        );
        const state = createGameState(ids);

        expect(isGameOver(state, config)).toBe(false);
    });

    test('should return true when all tiles are matched', () => {
        const config: Config = {
            lines: 2,
            columns: 2,
            imagesUsed: 1,
        };
        const ids = Array.from({ length: config.lines * config.columns }).map(
            (_, idx) => ({
                id: `id${idx}` as GridPositionId,
                imageName: `image1`,
            }),
        );
        let state = createGameState(ids);

        // match all tiles
        state = selectTiles(
            state,
            ids.map((id) => id.id),
        );

        expect(isGameOver(state, config)).toBe(true);
    });
});

describe(calcScore.name, () => {
    test('should calculate the score correctly', () => {
        const config: Config = {
            lines: 4,
            columns: 4,
            imagesUsed: 1,
        };
        // best case is when you always make a match on the first try
        const bestGuessScenario = (config.columns * config.lines) / 2;

        const tests = [
            {
                guesses: bestGuessScenario,
                score: 100,
            },
            {
                guesses: bestGuessScenario * 2,
                score: 50,
            },
            {
                guesses: bestGuessScenario * 3,
                score: 33,
            },
            {
                guesses: bestGuessScenario * 4,
                score: 25,
            },
        ];

        tests.forEach(({ guesses, score }) => {
            const state = {
                grid: [],
                selected1: null,
                selected2: null,
                matchedTiles: 0,
                guessesCount: guesses,
                tiles: {},
            };

            expect(calcScore(state, config)).toBe(score);
        });
    });
});
