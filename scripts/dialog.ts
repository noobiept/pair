module Dialog {

    var DIALOG: HTMLElement;
    var OVERLAY: HTMLElement;
    var TITLE: HTMLElement;
    var BODY: HTMLElement;
    var ON_CLOSE: () => void;


    export function init() {
        DIALOG = document.getElementById( 'Dialog' )!;
        OVERLAY = document.getElementById( 'DialogOverlay' )!;
        TITLE = document.getElementById( 'DialogTitle' )!;
        BODY = document.getElementById( 'DialogBody' )!;

        let restart = document.getElementById( 'DialogRestart' )!;
        restart.onclick = function () {
            hide();

            if ( ON_CLOSE ) {
                ON_CLOSE();
            }
        };
    }


    export function show( title: string, body: string, onClose: () => void ) {
        TITLE.innerHTML = title;
        BODY.innerHTML = body;
        ON_CLOSE = onClose;

        DIALOG.classList.remove( 'hidden' );
        OVERLAY.classList.remove( 'hidden' );
    }


    function hide() {
        DIALOG.classList.add( 'hidden' );
        OVERLAY.classList.add( 'hidden' );
    }
}