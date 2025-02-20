import { createStore } from 'jotai';
import { beforeEach, describe, expect, test } from 'vitest';

import { configAtom } from '../config';
import { highScoreAtom } from './high-score.atom';

describe('High Score', () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        const config = {
            columns: 6,
            lines: 4,
            imagesUsed: 2,
        };
        store = createStore();
        store.set(configAtom, config);
    });

    test('Initial high-score should be undefined', () => {
        expect(store.get(highScoreAtom)).toBeUndefined();
    });

    test('When adding a new high score, it should be saved', () => {
        expect(store.get(highScoreAtom)).toBeUndefined();

        store.set(highScoreAtom, 100);
        expect(store.get(highScoreAtom)).toBe(100);
    });

    test("when adding a new high score, should only be saved if it's higher than the previous one", () => {
        expect(store.get(highScoreAtom)).toBeUndefined();

        store.set(highScoreAtom, 50);
        expect(store.get(highScoreAtom)).toBe(50);

        store.set(highScoreAtom, 20);
        expect(store.get(highScoreAtom)).toBe(50);

        store.set(highScoreAtom, 70);
        expect(store.get(highScoreAtom)).toBe(70);
    });
});
