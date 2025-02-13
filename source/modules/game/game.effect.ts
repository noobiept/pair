import { atomEffect } from 'jotai-effect';
import { gameStateAtom } from './game.atom';
import { configAtom } from '../config';

export const gameEffect = atomEffect((get, set) => {
    const game = get(gameStateAtom);
    let index = -1;

    if (game.grid.length === 0) {
        set(gameStateAtom, {
            type: 'game/reset-grid',
            payload: {
                config: get(configAtom),
            },
        });
    }

    // a choice was made
    if (game.selected1 && game.selected2) {
        index = window.setTimeout(() => {
            set(gameStateAtom, {
                type: 'game/reset-selection',
            });
        }, 500);
    }

    return () => {
        window.clearTimeout(index);
    };
});
