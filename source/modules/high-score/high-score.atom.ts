import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { type Config, configAtom } from '../config';
import type { HighScoreData, HighScoreKey } from './high-score.types';

const allHighScoresAtom = atomWithStorage<HighScoreData>(
    'pair_high_scores',
    {},
);

export const highScoreAtom = atom(
    (get) => {
        const config = get(configAtom);
        const key = getKey(config);
        const scores = get(allHighScoresAtom);
        return scores[key];
    },
    (get, set, score: number) => {
        const config = get(configAtom);
        const key = getKey(config);
        const scores = get(allHighScoresAtom);
        const previous = scores[key] ?? 0;

        set(allHighScoresAtom, {
            ...get(allHighScoresAtom),
            [key]: Math.max(score, previous),
        });
    },
);

/**
 * The key is used to access the high-score (1 score per configuration).
 */
function getKey(config: Config): HighScoreKey {
    return `${config.columns}/${config.lines}/${config.imagesUsed}` as HighScoreKey;
}
