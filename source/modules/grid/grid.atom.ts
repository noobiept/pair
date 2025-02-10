import { atom } from 'jotai';
import type { GridPosition } from './grid.types';
import { configAtom } from '../config';
import { newGame } from '../../main'; // TODO

export const gridAtom = atom<GridPosition[][]>((get) => {
    const config = get(configAtom);

    return newGame(config);
});
