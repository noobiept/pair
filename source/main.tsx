import { shuffle } from '@drk4/utilities';
import * as HighScore from './high-score';
import * as Menu from './menu';
import * as Message from './message';
import * as Dialog from './dialog';
import { Game } from './game';
import { IMAGES } from './constants';
import { removeRandomElement } from './utilities';
import { gridAtom, type GridPosition } from './modules/grid';

import './style.css';
import { useEffect } from 'react';
import { Tile } from './components/tile';
import {
    DEFAULT_CONFIG,
    type Config,
    type PartialConfig,
} from './modules/config';
import { useAtomValue } from 'jotai';

export function Main() {
    useEffect(() => {
        init();
    }, []);

    const gridData = useAtomValue(gridAtom);

    return (
        <div id="Container">
            {gridData.map((row, line) => (
                <div className="lineContainer" key={line}>
                    {row.map((position, column) => (
                        <Tile key={column} {...position} />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ---------------

let CONTAINER: HTMLElement;

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
    CONTAINER = document.getElementById('Container') as HTMLElement; // TODO

    HighScore.init();
    Menu.init({
        config: DEFAULT_CONFIG, // TODO
        restartGame: (config) => restartGame(config),
    });
    Message.init();
    Dialog.init();
}

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
    const tiles: GridPosition[] = [];
    const onClick = () => {
        // GAME?.tileSelected(tile);
    };

    for (let a = 0; a < imagesUsed; a++) {
        const imageName = removeRandomElement(imagesCopy);

        for (let b = 0; b < pairsPerImage; b++) {
            // need to add a pair each time
            tiles.push(
                {
                    imageName,
                    onClick,
                },
                {
                    imageName,
                    onClick,
                },
            );
        }

        // add an extra pair until there are no more extra
        if (extraPairs > 0) {
            tiles.push({ imageName, onClick }, { imageName, onClick });
            extraPairs--;
        }
    }

    shuffle(tiles);

    // update the high-score
    // const score = HighScore.get(config);
    // Menu.updateHighScore(score); // TODO

    // TODO
    // adjustContainerWidth(document.body, columnCount, tiles[0].getWidth());

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
