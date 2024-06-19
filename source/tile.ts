import { ImageName, Tile } from './types';

interface TileArgs {
    name: ImageName;
    onClick: (tile: Tile) => void;
}

export class TileImpl implements Tile {
    private tile: HTMLElement;

    constructor({ name, onClick }: TileArgs) {
        const front = document.createElement('img');
        front.src = 'images/' + name;
        front.className = 'frontTile';

        const back = document.createElement('img');
        back.src = 'images/tile_aqua.png';
        back.className = 'backTile';

        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.setAttribute('data-id', name);

        tile.appendChild(back);
        tile.appendChild(front);
        tile.onmousedown = () => onClick(this);

        this.tile = tile;
    }

    appendTo(container: HTMLElement): void {
        container.appendChild(this.tile);
    }

    getWidth(): number {
        const tileMargin = 20;
        return this.tile.clientWidth + tileMargin;
    }

    isAlreadyMatched() {
        return Boolean(this.tile.getAttribute('data-done'));
    }

    markAsMatched() {
        this.tile.setAttribute('data-done', '1');
    }

    show() {
        this.tile.classList.add('showTile');
    }

    hide() {
        this.tile.classList.remove('showTile');
    }

    getDataID() {
        return this.tile.getAttribute('data-id');
    }

    correctGuess() {
        this.tile.classList.add('correctGuess');
    }

    animateCorrectGuess(other: Tile, onEnd?: () => void) {
        this.markAsMatched(); // so we can ignore them later on
        other.markAsMatched();

        this.tile.addEventListener(
            'transitionend',
            () => {
                this.correctGuess();
                other.correctGuess();
                onEnd?.();
            },
            { once: true },
        );
    }

    animateIncorrectGuess(other: Tile, onEnd?: () => void) {
        this.tile.addEventListener(
            'transitionend',
            () => {
                this.hide();
                other.hide();
                onEnd?.();
            },
            {
                once: true,
            },
        );
    }
}
