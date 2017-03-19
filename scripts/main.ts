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

        for ( var a = 0; a < 5; a++ ) {
            let imageName = removeRandomElement( imagesCopy );

            // need to add a pair each time
            let tile1 = createTile( imageName );;
            let tile2 = createTile( imageName );;

            CONTAINER.appendChild( tile1 );
            CONTAINER.appendChild( tile2 );
        }
    }


    /**
     * Remove a random element from the given array.
     */
    function removeRandomElement<T>( array: T[] ): T {
        let position = getRandomInt( 0, array.length - 1 );

        return array.splice( position, 1 )[ 0 ];
    }


    /**
     * Get a random integer in the given range (inclusive).
     */
    function getRandomInt( min: number, max: number ) {
        return Math.round( min + ( max - min ) * Math.random() );
    }


    /**
     * Create a tile element.
     */
    function createTile( name: string ) {
        var tile = document.createElement( 'img' );
        tile.src = 'images/' + name;
        tile.className = 'tile';

        return tile;
    }
}
