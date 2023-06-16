let DIALOG: HTMLElement;
let OVERLAY: HTMLElement;
let TITLE: HTMLElement;
let BODY: HTMLElement;
let ON_CLOSE: () => void;

export function init() {
    DIALOG = document.getElementById('Dialog') as HTMLElement;
    OVERLAY = document.getElementById('DialogOverlay') as HTMLElement;
    TITLE = document.getElementById('DialogTitle') as HTMLElement;
    BODY = document.getElementById('DialogBody') as HTMLElement;

    const restart = document.getElementById('DialogRestart') as HTMLElement;
    restart.onclick = function () {
        hide();

        if (ON_CLOSE) {
            ON_CLOSE();
        }
    };
}

export function show(title: string, body: string, onClose: () => void) {
    TITLE.innerHTML = title;
    BODY.innerHTML = body;
    ON_CLOSE = onClose;

    DIALOG.classList.remove('hidden');
    OVERLAY.classList.remove('hidden');
}

function hide() {
    DIALOG.classList.add('hidden');
    OVERLAY.classList.add('hidden');
}
