module Menu {

    var GUESSES_ELEMENT: HTMLElement;


    /**
     * Initialize the game menu elements.
     * Update the controls initial value to match the game's.
     * Set the on change event listeners.
     */
    export function init( columnsCount: number, linesCount: number, imagesUsedCount: number ) {

        // guess count
        GUESSES_ELEMENT = document.getElementById( 'GuessesCount' )!;

        // columns
        let columns = <HTMLInputElement>document.getElementById( 'Columns' );
        let columnsValue = <HTMLSpanElement>document.getElementById( 'ColumnsValue' );

        columns.valueAsNumber = columnsCount;
        columns.onchange = function () {
            COLUMNS = columns.valueAsNumber;
            columnsValue.innerText = columns.value;
            restartGame();
        };

        columnsValue.innerText = columns.value;

        // lines
        let lines = <HTMLInputElement>document.getElementById( 'Lines' );
        let linesValue = <HTMLSpanElement>document.getElementById( 'LinesValue' );

        lines.valueAsNumber = linesCount;
        lines.onchange = function () {
            LINES = lines.valueAsNumber;
            linesValue.innerText = lines.value;
            restartGame();
        };

        linesValue.innerText = lines.value;

        // images used
        let imagesUsed = <HTMLInputElement>document.getElementById( 'ImagesUsed' );
        let imagesUsedValue = <HTMLSpanElement>document.getElementById( 'ImagesUsedValue' );

        imagesUsed.valueAsNumber = imagesUsedCount;
        imagesUsed.onchange = function () {
            IMAGES_USED = imagesUsed.valueAsNumber;
            imagesUsedValue.innerText = imagesUsed.value;
            restartGame();
        };

        imagesUsedValue.innerText = imagesUsed.value;

        // restart
        let restart = document.getElementById( 'Restart' )!;
        restart.onclick = Main.restartGame;
    }


    /**
     * Set the number of guesses to the given value (also update the UI element).
     */
    export function updateGuesses( value: number ) {
        GUESSES_ELEMENT.innerText = value.toString();
    }
}