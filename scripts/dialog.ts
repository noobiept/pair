module Dialog {

    var DIALOG: HTMLElement;
    var OVERLAY: HTMLElement;
    var CONTENT: HTMLElement;
    var ON_CLOSE: () => void;


    export function init() {
        DIALOG = document.getElementById( 'Dialog' )!;
        OVERLAY = document.getElementById( 'DialogOverlay' )!;
        CONTENT = document.getElementById( 'DialogContent' )!;

        let restart = document.getElementById( 'DialogRestart' )!;
        restart.onclick = function () {
            hide();

            if ( ON_CLOSE ) {
                ON_CLOSE();
            }
        };
    }


    export function show( text: string, onClose: () => void ) {
        CONTENT.innerText = text;
        ON_CLOSE = onClose;

        DIALOG.classList.remove( 'hidden' );
        OVERLAY.classList.remove( 'hidden' );
    }


    function hide() {
        DIALOG.classList.add( 'hidden' );
        OVERLAY.classList.add( 'hidden' );
    }
}