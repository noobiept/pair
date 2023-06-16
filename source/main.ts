import * as Utilities from '@drk4/utilities';
import * as HighScore from './high-score';
import { Config, PartialConfig } from './types';
import * as Menu from './menu';
import * as Message from './message';
import * as Dialog from './dialog';

import './style.css';

window.onload = init;

let CONTAINER: HTMLElement;
const IMAGES = [
    'banana.png',
    'black-berry-dark.png',
    'black-berry-light.png',
    'black-cherry.png',
    'coconut.png',
    'green-apple.png',
    'green-grape.png',
    'lemon.png',
    'lime.png',
    'orange.png',
    'peach.png',
    'pear.png',
    'plum.png',
    'raspberry.png',
    'red-apple.png',
    'red-cherry.png',
    'red-grape.png',
    'star-fruit.png',
    'strawberry.png',
    'watermelon.png',
];
let SELECTED1: HTMLElement | null = null;
let SELECTED2: HTMLElement | null = null;
let MATCHED_TILES = 0;
let GUESSES_COUNT = 0;

const DEFAULT_CONFIG: Config = {
    columns: 6,
    lines: 4,
    imagesUsed: 5,
};
let CONFIG: Config = {
    columns: 0,
    lines: 0,
    imagesUsed: 0,
};

/**
 * Runs once at the start of the game.
 */
export function init() {
    CONTAINER = document.getElementById('Container') as HTMLElement;

    HighScore.init();
    Menu.init({
        config: DEFAULT_CONFIG,
        restartGame: (config) => restartGame(config),
    });
    Message.init();
    Dialog.init();
    newGame(DEFAULT_CONFIG);
}

/**
 * Start a new game.
 */
function newGame(config: Config) {
    const columnCount = config.columns;
    const lineCount = config.lines;
    let imagesUsed = config.imagesUsed;
    const totalTiles = columnCount * lineCount;
    const totalPairs = totalTiles / 2;

    if (totalTiles % 2 !== 0) {
        throw new Error(
            `Total number of tiles needs to be an even number. -- columnCount: ${columnCount} / lineCount: ${lineCount} / total (column * line): ${totalTiles}`
        );
    }

    // trying to use more images than possible (given the columns/lines combination)
    if (imagesUsed > totalPairs) {
        imagesUsed = totalPairs;
    }

    CONFIG = config;

    // create the tiles
    const pairsPerImage = Math.floor(totalPairs / imagesUsed);
    let extraPairs = totalPairs % imagesUsed;
    const imagesCopy = IMAGES.slice();
    const tiles = [];

    for (let a = 0; a < imagesUsed; a++) {
        const imageName = removeRandomElement(imagesCopy);

        for (let b = 0; b < pairsPerImage; b++) {
            // need to add a pair each time
            tiles.push(createTile(imageName));
            tiles.push(createTile(imageName));
        }

        // add an extra pair until there are no more extra
        if (extraPairs > 0) {
            tiles.push(createTile(imageName));
            tiles.push(createTile(imageName));
            extraPairs--;
        }
    }

    Utilities.shuffle(tiles);

    // add to the game
    for (let line = 0; line < lineCount; line++) {
        const lineContainer = document.createElement('div');
        lineContainer.className = 'lineContainer';

        for (let column = 0; column < columnCount; column++) {
            lineContainer.appendChild(tiles[line * columnCount + column]);
        }

        CONTAINER.appendChild(lineContainer);
    }

    // update the high-score
    const score = HighScore.get(config);
    Menu.updateHighScore(score);
}

/**
 * Clear the game elements.
 */
function clearGame() {
    SELECTED1 = null;
    SELECTED2 = null;
    MATCHED_TILES = 0;
    GUESSES_COUNT = 0;
    Menu.updateGuesses(0);

    while (CONTAINER.lastElementChild) {
        CONTAINER.removeChild(CONTAINER.lastElementChild);
    }
}

/**
 * Clear the previous game state, and start a new one.
 */
export function restartGame(newConfig?: PartialConfig) {
    clearGame();

    // we receive a dictionary with possible changes to the current configuration
    // update the game config based on that
    if (newConfig) {
        Object.keys(newConfig).forEach((key) => {
            const typedKey = key as keyof Config;
            const newValue = newConfig[typedKey];

            if (newValue) {
                CONFIG[typedKey] = newValue;
            }
        });
    }

    newGame(CONFIG);
    Message.show('Restart');
}

/**
 * Remove a random element from the given array.
 */
function removeRandomElement<T>(array: T[]): T {
    const position = Utilities.getRandomInt(0, array.length - 1);

    return array.splice(position, 1)[0];
}

/**
 * Create a tile element.
 */
function createTile(name: string) {
    const front = document.createElement('img');
    front.src = 'images/' + name;
    front.className = 'frontTile';

    const back = document.createElement('img');
    back.src = 'images/tile_aqua.png';
    back.className = 'backTile';

    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.setAttribute('data-id', name);

    tile.appendChild(back);
    tile.appendChild(front);
    tile.onmousedown = () => {
        tileSelected(tile);
    };

    return tile;
}

/**
 * A Tile was selected (clicked on). If its the first one being selected keep track of it, otherwise compare with the previously selected tile to see if its a match.
 */
function tileSelected(tile: HTMLElement) {
    // already was matched so can't be used anymore
    if (tile.getAttribute('data-done')) {
        return;
    }

    // don't allow the same tile to be selected again
    if (tile === SELECTED1 || tile === SELECTED2) {
        return;
    }

    if (!SELECTED1) {
        SELECTED1 = tile;
        tile.classList.add('showTile');
    } else if (!SELECTED2) {
        SELECTED2 = tile;
        tile.classList.add('showTile');

        // a guess was made (2 tiles selected)
        GUESSES_COUNT++;
        Menu.updateGuesses(GUESSES_COUNT);

        // correct guess
        if (
            SELECTED1.getAttribute('data-id') === tile.getAttribute('data-id')
        ) {
            SELECTED1.setAttribute('data-done', '1'); // so we can ignore them later on
            SELECTED2.setAttribute('data-done', '1');
            SELECTED1.classList.add('correctGuess');
            SELECTED2.classList.add('correctGuess');
            SELECTED1 = null;
            SELECTED2 = null;

            MATCHED_TILES += 2;

            const totalTiles = CONFIG.columns * CONFIG.lines;

            // game over (all tiles matched)
            if (MATCHED_TILES >= totalTiles) {
                const totalPairs = totalTiles / 2;
                const score = Math.round((totalPairs / GUESSES_COUNT) * 100);

                HighScore.add(CONFIG, score);
                Dialog.show(
                    `Game Over!`,
                    `Total Pairs: ${totalPairs}<br />Guesses: ${GUESSES_COUNT}<br />Score: ${score}%`,
                    function () {
                        restartGame();
                    }
                );
            }
        } else {
            tile.addEventListener('transitionend', invalidMatch);
        }
    }
}

/**
 * A match was deemed invalid. Hide both tiles and reset the selection.
 */
function invalidMatch() {
    if (SELECTED1) {
        SELECTED1.classList.remove('showTile');
        SELECTED1 = null;
    }

    if (SELECTED2) {
        SELECTED2.classList.remove('showTile');
        SELECTED2.removeEventListener('transitionend', invalidMatch);
        SELECTED2 = null;
    }
}
