import type { Opaque } from 'ts-essentials';

export type HighScoreKey = Opaque<string, 'high-score-key'>;

export type HighScoreData = {
    [config: HighScoreKey]: number;
};
