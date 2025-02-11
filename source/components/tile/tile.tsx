import { clsx } from 'clsx';
import { type GridPosition } from '../../modules/grid';
import { useTile } from './tile.hooks';

export type TileProps = GridPosition;

export function Tile(props: TileProps) {
    const { front, onClick, state } = useTile(props);

    return (
        <div
            data-id={props.imageName}
            onClick={onClick}
            className={clsx(['tile', state === 'showing' ? 'showTile' : ''])}
        >
            <img src={front} className="frontTile" />
            <img src="images/tile_aqua.png" className="backTile" />
        </div>
    );
}
