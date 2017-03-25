module Menu {

    var GUESSES_ELEMENT: HTMLElement;


    /**
     * Initialize the game menu elements.
     * Update the controls initial value to match the game's.
     * Set the on change event listeners.
     */
    export function init( config: Config ) {

        // guess count
        GUESSES_ELEMENT = document.getElementById( 'GuessesCount' )!;

        // columns
        let columns = <HTMLInputElement>document.getElementById( 'Columns' );
        let columnsValue = <HTMLSpanElement>document.getElementById( 'ColumnsValue' );

        columns.valueAsNumber = config.columns;
        columns.onchange = function () {
            columnsValue.innerText = columns.value;
            Main.restartGame( {
                columns: columns.valueAsNumber
            } );
        };

        columnsValue.innerText = columns.value;

        // lines
        let lines = <HTMLInputElement>document.getElementById( 'Lines' );
        let linesValue = <HTMLSpanElement>document.getElementById( 'LinesValue' );

        lines.valueAsNumber = config.lines;
        lines.onchange = function () {
            linesValue.innerText = lines.value;
            Main.restartGame( {
                lines: lines.valueAsNumber
            } );
        };

        linesValue.innerText = lines.value;

        // images used
        let imagesUsed = <HTMLInputElement>document.getElementById( 'ImagesUsed' );
        let imagesUsedValue = <HTMLSpanElement>document.getElementById( 'ImagesUsedValue' );

        imagesUsed.valueAsNumber = config.imagesUsed;
        imagesUsed.onchange = function () {
            imagesUsedValue.innerText = imagesUsed.value;
            Main.restartGame( {
                imagesUsed: imagesUsed.valueAsNumber
            } );
        };

        imagesUsedValue.innerText = imagesUsed.value;

        // restart
        let restart = document.getElementById( 'Restart' )!;
        restart.onclick = function () {
            Main.restartGame();
        };
    }


    /**
     * Set the number of guesses to the given value (also update the UI element).
     */
    export function updateGuesses( value: number ) {
        GUESSES_ELEMENT.innerText = value.toString();
    }
}