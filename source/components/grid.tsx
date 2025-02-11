import { useAtomValue } from 'jotai';
import { gridAtom } from '../modules/grid';
import { Tile } from './tile';

export function Grid() {
    const gridData = useAtomValue(gridAtom);

    return (
        <div id="Container">
            {gridData.map((row, line) => (
                <div className="lineContainer" key={line}>
                    {row.map((position, column) => (
                        <Tile key={column} {...position} />
                    ))}
                </div>
            ))}
        </div>
    );
}
