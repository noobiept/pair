/// <reference path="../libraries/utilities.2.0.0.d.ts" />


window.onload = function () {
    Main.init();
};


// values used to start a new game
interface Config {
    columns: number;
    lines: number;
    imagesUsed: number;
}


module Main {

    let CONTAINER: HTMLElement;
    let IMAGES = [ 'banana.png', 'black-berry-dark.png', 'black-berry-light.png', 'black-cherry.png', 'coconut.png', 'green-apple.png', 'green-grape.png', 'lemon.png', 'lime.png', 'orange.png', 'peach.png', 'pear.png', 'plum.png', 'raspberry.png', 'red-apple.png', 'red-cherry.png', 'red-grape.png', 'star-fruit.png', 'strawberry.png', 'watermelon.png' ];
    var SELECTED1: HTMLElement | null = null;
    var SELECTED2: HTMLElement | null = null;
    var MATCHED_TILES = 0;
    var GUESSES_COUNT = 0;

    var DEFAULT_CONFIG: Config = {
        columns: 6,
        lines: 4,
        imagesUsed: 5
    };
    var CONFIG: Config = {
        columns: 0,
        lines: 0,
        imagesUsed: 0
    }


    /**
     * Runs once at the start of the game.
     */
    export function init() {
        CONTAINER = document.getElementById( 'Container' )!;

        Menu.init( DEFAULT_CONFIG );
        Message.init();
        Dialog.init();
        newGame( DEFAULT_CONFIG );
    }


    /**
     * Start a new game.
     */
    function newGame( config: Config ) {
        let columnCount = config.columns;
        let lineCount = config.lines;
        let imagesUsed = config.imagesUsed;
        let totalTiles = columnCount * lineCount;
        let totalPairs = totalTiles / 2;

        if ( totalTiles % 2 !== 0 ) {
            throw new Error( `Total number of tiles needs to be an even number. -- columnCount: ${columnCount} / lineCount: ${lineCount} / total (column * line): ${totalTiles}` );
        }

        // trying to use more images than possible (given the columns/lines combination)
        if ( imagesUsed > totalPairs ) {
            imagesUsed = totalPairs;
        }

        CONFIG = config;

        let pairsPerImage = Math.floor( totalPairs / imagesUsed );
        let extraPairs = totalPairs % imagesUsed;
        var imagesCopy = IMAGES.slice();
        var tiles = [];

        for ( var a = 0; a < imagesUsed; a++ ) {
            let imageName = removeRandomElement( imagesCopy );

            for ( var b = 0; b < pairsPerImage; b++ ) {
                // need to add a pair each time
                tiles.push( createTile( imageName ) );
                tiles.push( createTile( imageName ) );
            }

            // add an extra pair until there are no more extra
            if ( extraPairs > 0 ) {
                tiles.push( createTile( imageName ) );
                tiles.push( createTile( imageName ) );
                extraPairs--;
            }
        }

        Utilities.shuffle( tiles );

        // add to the game
        for ( var line = 0; line < lineCount; line++ ) {
            let lineContainer = document.createElement( 'div' );
            lineContainer.className = 'lineContainer';

            for ( var column = 0; column < columnCount; column++ ) {
                lineContainer.appendChild( tiles[ line * columnCount + column ] );
            }

            CONTAINER.appendChild( lineContainer );
        }
    }


    /**
     * Clear the game elements.
     */
    function clearGame() {
        SELECTED1 = null;
        SELECTED2 = null;
        MATCHED_TILES = 0;
        GUESSES_COUNT = 0;
        Menu.updateGuesses( 0 );

        while ( CONTAINER.lastElementChild ) {
            CONTAINER.removeChild( CONTAINER.lastElementChild );
        }
    }


    /**
     * Clear the previous game state, and start a new one.
     */
    export function restartGame( newConfig?: { [ key: string ]: number } ) {
        clearGame();

        // we receive a dictionary with possible changes to the current configuration
        // update the game config based on that
        if ( newConfig ) {
            for ( var key in newConfig ) {
                if ( newConfig.hasOwnProperty( key ) ) {
                    ( <any>CONFIG )[ key ] = newConfig[ key ];
                }
            }
        }

        newGame( CONFIG );
        Message.show( 'Restart' );
    }


    /**
     * Remove a random element from the given array.
     */
    function removeRandomElement<T>( array: T[] ): T {
        let position = Utilities.getRandomInt( 0, array.length - 1 );

        return array.splice( position, 1 )[ 0 ];
    }


    /**
     * Create a tile element.
     */
    function createTile( name: string ) {
        var front = document.createElement( 'img' );
        front.src = 'images/' + name;
        front.className = 'frontTile';

        var back = document.createElement( 'img' );
        back.src = 'images/tile_aqua.png';
        back.className = 'backTile';

        var tile = document.createElement( 'div' );
        tile.className = 'tile';
        tile.setAttribute( 'data-id', name );

        tile.appendChild( back );
        tile.appendChild( front );
        tile.onmousedown = tileSelected;

        return tile;
    }


    /**
     * A Tile was selected (clicked on). If its the first one being selected keep track of it, otherwise compare with the previously selected tile to see if its a match.
     */
    function tileSelected( this: HTMLElement ) {
        let tile = this;

        // already was matched so can't be used anymore
        if ( tile.getAttribute( 'data-done' ) ) {
            return;
        }

        // don't allow the same tile to be selected again
        if ( tile === SELECTED1 || tile === SELECTED2 ) {
            return;
        }

        if ( !SELECTED1 ) {
            SELECTED1 = tile;
            tile.classList.add( 'showTile' );
        }

        else if ( !SELECTED2 ) {
            SELECTED2 = tile;
            tile.classList.add( 'showTile' );

            // a guess was made (2 tiles selected)
            GUESSES_COUNT++;
            Menu.updateGuesses( GUESSES_COUNT );

            // correct guess
            if ( SELECTED1.getAttribute( 'data-id' ) === tile.getAttribute( 'data-id' ) ) {
                SELECTED1.setAttribute( 'data-done', '1' );  // so we can ignore them later on
                SELECTED2.setAttribute( 'data-done', '1' );
                SELECTED1.classList.add( 'correctGuess' );
                SELECTED2.classList.add( 'correctGuess' );
                SELECTED1 = null;
                SELECTED2 = null;

                MATCHED_TILES += 2;

                let totalTiles = CONFIG.columns * CONFIG.lines;

                // game over (all tiles matched)
                if ( MATCHED_TILES >= totalTiles ) {
                    let totalPairs = totalTiles / 2;
                    let score = Math.round( totalPairs / GUESSES_COUNT * 100 );

                    Dialog.show(
                        `Game Over!`,
                        `Total Pairs: ${totalPairs}<br />Guesses: ${GUESSES_COUNT}<br />Score: ${score}%`,
                        function () {
                            restartGame();
                        } );
                }
            }

            else {
                tile.addEventListener( 'transitionend', invalidMatch );
            }
        }
    }


    /**
     * A match was deemed invalid. Hide both tiles and reset the selection.
     */
    function invalidMatch() {
        SELECTED1!.classList.remove( 'showTile' );
        SELECTED2!.classList.remove( 'showTile' );
        SELECTED2!.removeEventListener( 'transitionend', invalidMatch );
        SELECTED1 = null;
        SELECTED2 = null;
    }
}
