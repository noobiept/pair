import { type Opaque } from 'ts-essentials';

export type GridPosition = {
    imageName: string;
    id: GridPositionId;
};

export type GridPositionId = Opaque<string, 'grid-position-id'>;

export type GridPositionState = 'hidden' | 'showing' | 'matched';

export type GridData = { [id: GridPositionId]: GridPositionState };
