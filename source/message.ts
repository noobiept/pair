export module Message {
    var CONTAINER: HTMLElement;

    export function init() {
        CONTAINER = document.getElementById('MessageContainer')!;
    }

    export function show(text: string) {
        let message = document.createElement('div');

        message.className = 'message';
        message.innerText = text;

        window.setTimeout(function () {
            CONTAINER.removeChild(message);
        }, 1000);

        CONTAINER.appendChild(message);
    }
}
