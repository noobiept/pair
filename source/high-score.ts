import type { Config } from './modules/config';

interface Scores {
    [config: string]: number;
}

let SCORES: Scores = {};

export function init() {
    const scores = loadFromStorage();

    if (scores) {
        SCORES = scores;
    }
}

/**
 * Save a single high-score per configuration.
 * Higher value is better.
 */
export function add(config: Config, score: number) {
    const key = getKey(config);
    const previousScore = SCORES[key];

    // save the score if its the first one, or if its better than the previous
    if (!previousScore || score > previousScore) {
        SCORES[key] = score;
        saveToStorage();
    }
}

/**
 * Get the high-score of the given configuration.
 */
export function get(config: Config) {
    return SCORES[getKey(config)];
}

/**
 * Save the high-scores to local storage.
 */
function saveToStorage() {
    localStorage.setItem('pair_high_scores', JSON.stringify(SCORES));
}

/**
 * Get the high-scores that are saved on the local storage.
 */
function loadFromStorage() {
    const value = localStorage.getItem('pair_high_scores');

    return value && JSON.parse(value);
}

/**
 * The key is used to access the high-score (1 score per configuration).
 */
function getKey(config: Config) {
    return `${config.columns}/${config.lines}/${config.imagesUsed}`;
}
