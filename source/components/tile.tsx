import type { GridPosition } from '../modules/grid';

export type TileProps = GridPosition;

export function Tile({ imageName, onClick }: TileProps) {
    const front = 'images/' + imageName;

    return (
        <div data-id={imageName} className="tile" onClick={onClick}>
            <img src={front} className="frontTile" />
            <img src="images/tile_aqua.png" className="backTile" />
        </div>
    );
}
