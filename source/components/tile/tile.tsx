import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import type { GridPosition } from '../../modules/game';
import { useTile } from './tile.hooks';
import styles from './tile.module.css';

type TileProps = GridPosition;

export function Tile(props: TileProps) {
    const { t } = useTranslation();
    const { front, onClick, state } = useTile(props);

    return (
        <div
            data-id={props.imageName}
            onClick={onClick}
            className={clsx([
                styles.tile,
                {
                    [styles.showTile]: state === 'visible',
                    [styles.correctGuess]: state === 'matched',
                },
            ])}
        >
            <img
                src={front}
                className={styles.frontTile}
                alt={t('tile.front-alt')}
            />
            <img
                src="images/tile_aqua.png"
                className={styles.backTile}
                alt={t('tile.back-alt')}
            />
        </div>
    );
}
