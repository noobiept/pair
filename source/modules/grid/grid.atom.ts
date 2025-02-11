import { atom } from 'jotai';
import type { GridData, GridPosition } from './grid.types';

export const gridAtom = atom<GridPosition[][]>([]);

export const tilesDataAtom = atom<GridData>({});
