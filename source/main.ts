import * as Utilities from '@drk4/utilities';
import * as HighScore from './high-score';
import { Config, PartialConfig, Tile } from './types';
import * as Menu from './menu';
import * as Message from './message';
import * as Dialog from './dialog';
import { Game } from './game';
import { TileImpl } from './tile';
import { IMAGES } from './constants';
import { adjustContainerWidth, removeRandomElement } from './utilities';

import './style.css';

// start of the app
window.onload = init;

let CONTAINER: HTMLElement;

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

let GAME: Game | null = null;

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
            `Total number of tiles needs to be an even number. -- columnCount: ${columnCount} / lineCount: ${lineCount} / total (column * line): ${totalTiles}`,
        );
    }

    // trying to use more images than possible (given the columns/lines combination)
    if (imagesUsed > totalPairs) {
        imagesUsed = totalPairs;
    }

    CONFIG = config;
    GAME = new Game({
        config,
        onPairGuess: (guessesCount) => {
            Menu.updateGuesses(guessesCount);
        },
        onEnd: (score, guessesCount) => {
            HighScore.add(config, score);
            Dialog.show(
                `Game Over!`,
                `Total Pairs: ${totalPairs}<br />Guesses: ${guessesCount}<br />Score: ${score}%`,
                function () {
                    restartGame();
                },
            );
        },
    });

    // create the tiles
    const pairsPerImage = Math.floor(totalPairs / imagesUsed);
    let extraPairs = totalPairs % imagesUsed;
    const imagesCopy = IMAGES.slice();
    const tiles: Tile[] = [];
    const onClick = (tile: Tile) => {
        GAME?.tileSelected(tile);
    };

    for (let a = 0; a < imagesUsed; a++) {
        const imageName = removeRandomElement(imagesCopy);

        for (let b = 0; b < pairsPerImage; b++) {
            // need to add a pair each time
            tiles.push(
                new TileImpl({
                    name: imageName,
                    onClick,
                }),
                new TileImpl({
                    name: imageName,
                    onClick,
                }),
            );
        }

        // add an extra pair until there are no more extra
        if (extraPairs > 0) {
            tiles.push(
                new TileImpl({
                    name: imageName,
                    onClick,
                }),
                new TileImpl({
                    name: imageName,
                    onClick,
                }),
            );
            extraPairs--;
        }
    }

    Utilities.shuffle(tiles);

    // add to the game
    for (let line = 0; line < lineCount; line++) {
        const lineContainer = document.createElement('div');
        lineContainer.className = 'lineContainer';

        for (let column = 0; column < columnCount; column++) {
            const tile = tiles[line * columnCount + column];
            tile.appendTo(lineContainer);
        }

        CONTAINER.appendChild(lineContainer);
    }

    // update the high-score
    const score = HighScore.get(config);
    Menu.updateHighScore(score);

    adjustContainerWidth(document.body, columnCount, tiles[0].getWidth());
}

/**
 * Clear the game elements.
 */
function clearGame() {
    GAME = null;
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
