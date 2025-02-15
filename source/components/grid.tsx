import { useAtomValue } from 'jotai';

import { gridAtom } from '../modules/game';
import { Tile } from './tile/tile';

export function Grid() {
    const grid = useAtomValue(gridAtom);

    return (
        <div id="Container">
            {grid.map((row, line) => (
                <div className="lineContainer" key={line}>
                    {row.map((position, column) => (
                        <Tile key={column} {...position} />
                    ))}
                </div>
            ))}
        </div>
    );
}
