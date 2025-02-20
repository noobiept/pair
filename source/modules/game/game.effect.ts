import { atomEffect } from 'jotai-effect';

import { configAtom } from '../config';
import { dialogAtom } from '../dialog';
import { highScoreAtom } from '../high-score';
import { gameStateAtom } from './game.atom';
import { calcScore, isGameOver } from './game-logic';

export const gameEffect = atomEffect((get, set) => {
    const game = get(gameStateAtom);
    const config = get(configAtom);
    let index = -1;

    // a choice was made
    if (game.selected1 && game.selected2) {
        index = window.setTimeout(() => {
            set(gameStateAtom, {
                type: 'game/reset-selection',
            });
        }, 500);
    }

    // when the game is over, show a dialog
    if (isGameOver(game, config)) {
        const score = calcScore(game, config);
        set(highScoreAtom, score);

        set(dialogAtom, {
            title: 'Congratulations!',
            body: `You have won the game! Score: ${score}%`,
            buttons: [
                {
                    text: 'Restart',
                    action: () => {
                        set(gameStateAtom, {
                            type: 'game/reset-grid',
                            payload: {
                                config,
                            },
                        });
                        set(dialogAtom, undefined);
                    },
                },
            ],
        });
    }

    return () => {
        window.clearTimeout(index);
    };
});

// whenever the config changes, we want to restart the game
export const restartGameEffect = atomEffect((get, set) => {
    const config = get(configAtom);
    set(gameStateAtom, {
        type: 'game/reset-grid',
        payload: {
            config,
        },
    });
});
