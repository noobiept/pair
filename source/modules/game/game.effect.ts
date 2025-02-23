import i18n from 'i18next';
import { atomEffect } from 'jotai-effect';

import { configAtom } from '../config';
import { dialogAtom } from '../dialog';
import { highScoreAtom } from '../high-score';
import { gameStateAtom, restartGameAtom } from './game.atom';
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
            title: i18n.t('game-over.title'),
            body: i18n.t('game-over.message', { score }),
            buttons: [
                {
                    text: i18n.t('game-over.new-game'),
                    action: () => {
                        set(restartGameAtom);
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
