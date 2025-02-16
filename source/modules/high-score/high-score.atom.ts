import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';

import { type Config, configAtom } from '../config';
import type { HighScoreData, HighScoreKey } from './high-score.types';

const allHighScoresAtom = atomWithStorage<HighScoreData>(
    'pair_high_scores',
    {},
);

export const highScoreAtom = atomFamily((key: HighScoreKey) => {
    return atom((get) => {
        const scores = get(allHighScoresAtom);
        return scores[key];
    });
});

export const addToHighScoreAtom = atom(null, (get, set, score: number) => {
    const config = get(configAtom);
    const key = getKey(config);
    const previous = get(highScoreAtom(key)) ?? 0;

    set(allHighScoresAtom, {
        ...get(allHighScoresAtom),
        [key]: Math.max(score, previous),
    });
});

/**
 * The key is used to access the high-score (1 score per configuration).
 */
export function getKey(config: Config): HighScoreKey {
    return `${config.columns}/${config.lines}/${config.imagesUsed}` as HighScoreKey;
}
