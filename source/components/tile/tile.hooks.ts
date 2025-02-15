import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';

import { gameStateAtom, type GridPosition } from '../../modules/game';

export const useTile = ({ imageName, id }: GridPosition) => {
    const front = 'images/' + imageName;
    const game = useAtomValue(gameStateAtom);
    const state = game.tiles[id].state;

    const onClick = useAtomCallback(
        useCallback(
            (get, set) => {
                set(gameStateAtom, {
                    type: 'game/select-tile',
                    payload: {
                        id,
                    },
                });
            },
            [id],
        ),
    );

    return {
        front,
        state,
        onClick,
    };
};
