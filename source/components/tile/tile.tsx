import { clsx } from 'clsx';
import { useTile } from './tile.hooks';
import type { GridPosition } from '../../modules/game';

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
            <img src={front} className="frontTile" />
            <img src="images/tile_aqua.png" className="backTile" />
        </div>
    );
}
