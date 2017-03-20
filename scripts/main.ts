/// <reference path="../libraries/utilities.2.0.0.d.ts" />


window.onload = function () {
    Main.init();
};


module Main {

    let CONTAINER: HTMLElement;
    let IMAGES = [ 'banana.png', 'black-berry-dark.png', 'black-berry-light.png', 'black-cherry.png', 'coconut.png', 'green-apple.png', 'green-grape.png', 'lemon.png', 'lime.png', 'orange.png', 'peach.png', 'pear.png', 'plum.png', 'raspberry.png', 'red-apple.png', 'red-grape.png', 'star-fruit.png', 'strawberry.png', 'watermelon.png' ];


    /**
     * Runs once at the start of the game.
     */
    export function init() {
        CONTAINER = document.getElementById( 'Container' )!;

        newGame();
    }


    /**
     * Start a new game.
     */
    function newGame() {
        var imagesCopy = IMAGES.slice();
        var tiles = [];

        for ( var a = 0; a < 5; a++ ) {
            let imageName = removeRandomElement( imagesCopy );

            // need to add a pair each time
            tiles.push( createTile( imageName ) );
            tiles.push( createTile( imageName ) );
        }

        Utilities.shuffle( tiles );

        // add to the game
        for ( var a = 0; a < tiles.length; a++ ) {
            CONTAINER.appendChild( tiles[ a ] );
        }
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

        tile.appendChild( back );
        tile.appendChild( front );

        tile.addEventListener( 'click', function () {
            tile.classList.add( 'showTile' );
        } );
        tile.addEventListener( 'transitionend', function () {
            tile.classList.remove( 'showTile' );
        } );

        return tile;
    }
}
