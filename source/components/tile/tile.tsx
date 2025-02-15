import { clsx } from 'clsx';

import type { GridPosition } from '../../modules/game';
import { useTile } from './tile.hooks';

type TileProps = GridPosition;

export function Tile(props: TileProps) {
    const { front, onClick, state } = useTile(props);

    return (
        <div
            data-id={props.imageName}
            onClick={onClick}
            className={clsx([
                'tile',
                {
                    showTile: state === 'visible',
                    correctGuess: state === 'matched',
                },
            ])}
        >
            <img src={front} className="frontTile" alt="Front tile" />
            <img
                src="images/tile_aqua.png"
                className="backTile"
                alt="Back tile"
            />
        </div>
    );
}
