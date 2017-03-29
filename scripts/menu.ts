module Menu {

    var HIGH_SCORE: HTMLElement;
    var GUESSES_ELEMENT: HTMLElement;


    /**
     * Initialize the game menu elements.
     * Update the controls initial value to match the game's.
     * Set the on change event listeners.
     */
    export function init( config: Config ) {

        // high-score
        HIGH_SCORE = document.getElementById( 'HighScore' )!;

        // guess count
        GUESSES_ELEMENT = document.getElementById( 'GuessesCount' )!;

        // columns
        let columns = <HTMLInputElement>document.getElementById( 'Columns' );
        let columnsValue = <HTMLSpanElement>document.getElementById( 'ColumnsValue' );

        columns.valueAsNumber = config.columns;
        columns.onchange = function ( event ) {

            var value = columns.valueAsNumber;

            // we can't have an odd total number of tiles (because we need to add tiles in pairs)
            // so we need to check if the new column/line combination isn't going to lead to an odd number of tiles
            // as long as one of them is even, we're good (can't have both being odd)
            if ( value % 2 !== 0 && lines.valueAsNumber % 2 !== 0 ) {
                // when they're both odd, we need to turn one of them into an even number
                value++;
                columns.value = value.toString();
            }

            columnsValue.innerText = value.toString();
            Main.restartGame( {
                columns: value
            } );
        };

        columnsValue.innerText = columns.value;

        // lines
        let lines = <HTMLInputElement>document.getElementById( 'Lines' );
        let linesValue = <HTMLSpanElement>document.getElementById( 'LinesValue' );

        lines.valueAsNumber = config.lines;
        lines.onchange = function () {

            var value = lines.valueAsNumber;

            // check the comment above (in columns 'change' listener)
            if ( value % 2 !== 0 && columns.valueAsNumber % 2 !== 0 ) {
                value++;
                lines.value = value.toString();
            }

            linesValue.innerText = value.toString();
            Main.restartGame( {
                lines: value
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


    export function updateHighScore( score?: number ) {

        if ( !score ) {
            HIGH_SCORE.innerText = '---';
        }

        else {
            HIGH_SCORE.innerText = score.toString();
        }
    }
}