import { IMAGES } from './constants';

// values used to start a new game
export interface Config {
    columns: number;
    lines: number;
    imagesUsed: number;
}

export type PartialConfig = Partial<Config>;

export interface Tile {
    isAlreadyMatched(): boolean;
    show(): void;
    hide(): void;
    markAsMatched(): void;
    getDataID(): string | null;
    animateCorrectGuess(other: Tile, onEnd?: () => void): void;
    animateIncorrectGuess(other: Tile, onEnd?: () => void): void;
    correctGuess(): void;
    appendTo(container: HTMLElement): void;
    getWidth(): number;
}

export type ImageName = (typeof IMAGES)[number];
