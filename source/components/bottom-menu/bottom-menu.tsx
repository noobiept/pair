import { useBottomMenu } from './bottom-menu.hooks';
import styles from './bottom-menu.module.css';

export function BottomMenu() {
    const {
        config,
        onColumnsChange,
        onImagesUsedChange,
        onLinesChange,
        onRestart,
    } = useBottomMenu();

    return (
        <div id={styles.Menu}>
            <div className={styles.item}>
                <label htmlFor="Columns">Columns</label>
                <span id="ColumnsValue" className={styles.value}>
                    {config.columns}
                </span>
                <input
                    id="Columns"
                    type="range"
                    min="4"
                    max="10"
                    value={config.columns}
                    onChange={onColumnsChange}
                />
            </div>
            <div className={styles.item}>
                <label htmlFor="Lines">Lines</label>
                <span id="LinesValue" className={styles.value}>
                    {config.lines}
                </span>
                <input
                    id="Lines"
                    type="range"
                    min="4"
                    max="10"
                    value={config.lines}
                    onChange={onLinesChange}
                />
            </div>

            <div className={styles.item}>
                <label htmlFor="ImagesUsed">Images used</label>
                <span id="ImagesUsedValue" className={styles.value}>
                    {config.imagesUsed}
                </span>
                <input
                    id="ImagesUsed"
                    type="range"
                    min="1"
                    max="20"
                    value={config.imagesUsed}
                    onChange={onImagesUsedChange}
                />
            </div>

            <button id="Restart" onClick={onRestart}>
                Restart
            </button>
        </div>
    );
}
