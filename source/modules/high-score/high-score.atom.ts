import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';
import type { HighScoreData, HighScoreKey } from './high-score.types';
import type { Config } from '../config';

export const allHighScoresAtom = atomWithStorage<HighScoreData>(
    'pair_high_scores',
    {},
);

export const highScoreAtom = atomFamily((key: HighScoreKey) => {
    return atom((get) => {
        const scores = get(allHighScoresAtom);
        return scores[key] ?? 0;
    });
});

/**
 * The key is used to access the high-score (1 score per configuration).
 */
export function getKey(config: Config): HighScoreKey {
    return `${config.columns}/${config.lines}/${config.imagesUsed}` as HighScoreKey;
}
