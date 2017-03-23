/// <reference path="../libraries/utilities.2.0.0.d.ts" />


window.onload = function () {
    Main.init();
};


module Main {

    let CONTAINER: HTMLElement;
    let IMAGES = [ 'banana.png', 'black-berry-dark.png', 'black-berry-light.png', 'black-cherry.png', 'coconut.png', 'green-apple.png', 'green-grape.png', 'lemon.png', 'lime.png', 'orange.png', 'peach.png', 'pear.png', 'plum.png', 'raspberry.png', 'red-apple.png', 'red-grape.png', 'star-fruit.png', 'strawberry.png', 'watermelon.png' ];
    var SELECTED1: HTMLElement | null = null;
    var SELECTED2: HTMLElement | null = null;
    var MATCHED_TILES = 0;
    var COLUMNS = 6;
    var LINES = 4;


    /**
     * Runs once at the start of the game.
     */
    export function init() {
        CONTAINER = document.getElementById( 'Container' )!;

        let restart = document.getElementById( 'Restart' )!;
        restart.onclick = restartGame;

        newGame( COLUMNS, LINES );
    }


    /**
     * Start a new game.
     */
    function newGame( columnCount: number, lineCount: number ) {
        let totalTiles = columnCount * lineCount;

        if ( totalTiles % 2 !== 0 ) {
            throw new Error( `columnCount: ${columnCount} / lineCount: ${lineCount} / total (column * line): ${totalTiles} -- Total needs to be an even number.` );
        }

        var imagesCopy = IMAGES.slice();
        var tiles = [];

        for ( var a = 0; a < totalTiles / 2; a++ ) {
            let imageName = removeRandomElement( imagesCopy );

            // need to add a pair each time
            tiles.push( createTile( imageName ) );
            tiles.push( createTile( imageName ) );
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

        while ( CONTAINER.lastElementChild ) {
            CONTAINER.removeChild( CONTAINER.lastElementChild );
        }
    }


    /**
     * Clear the previous game state, and start a new one.
     */
    function restartGame() {
        clearGame();
        newGame( COLUMNS, LINES );
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

            // correct guess
            if ( SELECTED1.getAttribute( 'data-id' ) === tile.getAttribute( 'data-id' ) ) {
                SELECTED1.setAttribute( 'data-done', '1' );  // so we can ignore them later on
                SELECTED2.setAttribute( 'data-done', '1' );
                SELECTED1.classList.add( 'correctGuess' );
                SELECTED2.classList.add( 'correctGuess' );
                SELECTED1 = null;
                SELECTED2 = null;

                MATCHED_TILES += 2;

                // game completed
                if ( MATCHED_TILES >= COLUMNS * LINES ) {
                    window.alert( 'Game Completed!' );
                    restartGame();
                }

            }

            else {
                tile.addEventListener( 'transitionend', invalidMatch );
            }
        }
    }


    function invalidMatch() {
        SELECTED1!.classList.remove( 'showTile' );
        SELECTED2!.classList.remove( 'showTile' );
        SELECTED2!.removeEventListener( 'transitionend', invalidMatch );
        SELECTED1 = null;
        SELECTED2 = null;
    }
}
