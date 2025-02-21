import { useAtomValue } from 'jotai';

import { generatedTimeAtom, gridAtom } from '../../modules/game';
import { Tile } from '../tile/tile';
import styles from './grid.module.css';

export function Grid() {
    const grid = useAtomValue(gridAtom);
    const generated = useAtomValue(generatedTimeAtom);

    return (
        <div id={styles.Container}>
            {grid.map((row, line) => (
                <div
                    className={styles.lineContainer}
                    key={`${generated}:${row}/${line}`}
                >
                    {row.map((position, column) => (
                        <Tile key={column} {...position} />
                    ))}
                </div>
            ))}
        </div>
    );
}
