import { Config, PartialConfig } from './types';

interface MenuArgs {
    config: Config;
    restartGame: (config?: PartialConfig) => void;
}

let HIGH_SCORE: HTMLElement;
let GUESSES_ELEMENT: HTMLElement;
let RESTART_GAME: (config?: PartialConfig) => void;

/**
 * Initialize the game menu elements.
 * Update the controls initial value to match the game's.
 * Set the on change event listeners.
 */
export function init({ config, restartGame }: MenuArgs) {
    RESTART_GAME = restartGame;

    // high-score
    HIGH_SCORE = document.getElementById('HighScore') as HTMLElement;

    // guess count
    GUESSES_ELEMENT = document.getElementById('GuessesCount') as HTMLElement;

    // columns
    const columns = document.getElementById('Columns') as HTMLInputElement;
    const columnsValue = document.getElementById(
        'ColumnsValue',
    ) as HTMLSpanElement;

    columns.valueAsNumber = config.columns;
    columns.onchange = function () {
        let value = columns.valueAsNumber;

        // we can't have an odd total number of tiles (because we need to add tiles in pairs)
        // so we need to check if the new column/line combination isn't going to lead to an odd number of tiles
        // as long as one of them is even, we're good (can't have both being odd)
        if (value % 2 !== 0 && lines.valueAsNumber % 2 !== 0) {
            // when they're both odd, we need to turn one of them into an even number
            value++;
            columns.value = value.toString();
        }

        columnsValue.innerText = value.toString();
        RESTART_GAME({
            columns: value,
        });
    };

    columnsValue.innerText = columns.value;

    // lines
    const lines = document.getElementById('Lines') as HTMLInputElement;
    const linesValue = document.getElementById('LinesValue') as HTMLSpanElement;

    lines.valueAsNumber = config.lines;
    lines.onchange = function () {
        let value = lines.valueAsNumber;

        // check the comment above (in columns 'change' listener)
        if (value % 2 !== 0 && columns.valueAsNumber % 2 !== 0) {
            value++;
            lines.value = value.toString();
        }

        linesValue.innerText = value.toString();
        RESTART_GAME({
            lines: value,
        });
    };

    linesValue.innerText = lines.value;

    // images used
    const imagesUsed = document.getElementById(
        'ImagesUsed',
    ) as HTMLInputElement;
    const imagesUsedValue = document.getElementById(
        'ImagesUsedValue',
    ) as HTMLSpanElement;

    imagesUsed.valueAsNumber = config.imagesUsed;
    imagesUsed.onchange = function () {
        imagesUsedValue.innerText = imagesUsed.value;
        RESTART_GAME({
            imagesUsed: imagesUsed.valueAsNumber,
        });
    };

    imagesUsedValue.innerText = imagesUsed.value;

    // restart
    const restart = document.getElementById('Restart') as HTMLElement;
    restart.onclick = function () {
        RESTART_GAME();
    };
}

/**
 * Set the number of guesses to the given value (also update the UI element).
 */
export function updateGuesses(value: number) {
    GUESSES_ELEMENT.innerText = value.toString();
}

export function updateHighScore(score?: number) {
    if (!score) {
        HIGH_SCORE.innerText = '---';
    } else {
        HIGH_SCORE.innerText = `${score}%`;
    }
}
