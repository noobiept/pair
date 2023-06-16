let CONTAINER: HTMLElement;

export function init() {
    CONTAINER = document.getElementById('MessageContainer') as HTMLElement;
}

export function show(text: string) {
    const message = document.createElement('div');

    message.className = 'message';
    message.innerText = text;

    window.setTimeout(function () {
        CONTAINER.removeChild(message);
    }, 1000);

    CONTAINER.appendChild(message);
}
