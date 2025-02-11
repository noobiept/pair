import { atom } from 'jotai';
import { gridAtom, GridData, tilesDataAtom } from '../grid';
import { configAtom, type Config } from '../config';
import { newGame } from './game-logic';

export const newGameAtom = atom(null, (get, set, config: Config) => {
    set(configAtom, config);

    const grid = newGame(config);
    const tileData = grid.flat().reduce<GridData>((acc, tile) => {
        acc[tile.id] = 'hidden';
        return acc;
    }, {});
    set(tilesDataAtom, tileData);
    set(gridAtom, grid);
});
