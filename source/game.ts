import { Config, Tile } from './types';

interface GameArgs {
    config: Config;
    onEnd: (score: number, guessesCount: number) => void;
    onPairGuess: (guessesCount: number) => void;
}

export class Game {
    private selected1: Tile | null = null;
    private selected2: Tile | null = null;
    private matchedTiles = 0;
    private guessesCount = 0;
    private config: Config;
    private onEnd: (score: number, guessesCount: number) => void;
    private onPairGuess: (guessesCount: number) => void;

    constructor({ config, onEnd, onPairGuess }: GameArgs) {
        this.config = config;
        this.onEnd = onEnd;
        this.onPairGuess = onPairGuess;
    }

    /**
     * A Tile was selected (clicked on). If its the first one being selected keep track of it, otherwise compare with the previously selected tile to see if its a match.
     */
    tileSelected(tile: Tile) {
        // already was matched so can't be used anymore
        if (tile.isAlreadyMatched()) {
            return;
        }

        // don't allow the same tile to be selected again
        if (tile === this.selected1 || tile === this.selected2) {
            return;
        }

        if (!this.selected1) {
            this.selected1 = tile;
            tile.show();
        } else if (!this.selected2) {
            this.selected2 = tile;
            tile.show();

            const selected1 = this.selected1;
            const selected2 = this.selected2;

            // a guess was made (2 tiles selected)
            this.guessesCount++;
            this.onPairGuess(this.guessesCount);

            // correct guess
            if (selected1.getDataID() === tile.getDataID()) {
                selected2.animateCorrectGuess(selected1);

                this.selected1 = null;
                this.selected2 = null;

                this.matchedTiles += 2;

                const config = this.config;
                const totalTiles = config.columns * config.lines;

                // game over (all tiles matched)
                if (this.matchedTiles >= totalTiles) {
                    const totalPairs = totalTiles / 2;
                    const score = Math.round(
                        (totalPairs / this.guessesCount) * 100,
                    );

                    this.onEnd(score, this.guessesCount);
                }
            } else {
                // A match was deemed invalid. Hide both tiles and reset the selection.
                selected2.animateIncorrectGuess(selected1, () => {
                    this.selected1 = null;
                    this.selected2 = null;
                });
            }
        }
    }
}
