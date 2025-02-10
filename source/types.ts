import { IMAGES } from './constants';

export interface ITile {
    isAlreadyMatched(): boolean;
    show(): void;
    hide(): void;
    markAsMatched(): void;
    getDataID(): string | null;
    animateCorrectGuess(other: ITile, onEnd?: () => void): void;
    animateIncorrectGuess(other: ITile, onEnd?: () => void): void;
    correctGuess(): void;
    appendTo(container: HTMLElement): void;
    getWidth(): number;
}

export type ImageName = (typeof IMAGES)[number];
