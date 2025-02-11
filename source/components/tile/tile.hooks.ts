import { useAtomValue } from 'jotai';
import { tilesDataAtom, type GridPosition } from '../../modules/grid';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';

export const useTile = ({ imageName, id }: GridPosition) => {
    const front = 'images/' + imageName;
    const state = useAtomValue(tilesDataAtom)[id];
    const onClick = useAtomCallback(
        useCallback((get, set) => {
            set(tilesDataAtom, (prev) => {
                return {
                    ...prev,
                    [id]: state === 'hidden' ? 'showing' : 'hidden',
                };
            });
        }, []),
    );

    return {
        front,
        state,
        onClick,
    };
};
