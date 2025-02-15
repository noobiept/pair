import { useBottomMenu } from './bottom-menu.hooks';

export function BottomMenu() {
    const {
        config,
        onColumnsChange,
        onImagesUsedChange,
        onLinesChange,
        onRestart,
    } = useBottomMenu();

    return (
        <div id="Menu">
            <label htmlFor="Columns">Columns</label>
            <span id="ColumnsValue">{config.columns}</span>
            <input
                id="Columns"
                type="range"
                min="4"
                max="10"
                value={config.columns}
                onChange={onColumnsChange}
            />

            <label htmlFor="Lines">Lines</label>
            <span id="LinesValue">{config.lines}</span>
            <input
                id="Lines"
                type="range"
                min="4"
                max="10"
                value={config.lines}
                onChange={onLinesChange}
            />

            <label htmlFor="ImagesUsed">Images used</label>
            <span id="ImagesUsedValue">{config.imagesUsed}</span>
            <input
                id="ImagesUsed"
                type="range"
                min="1"
                max="20"
                value={config.imagesUsed}
                onChange={onImagesUsedChange}
            />

            <button id="Restart" onClick={onRestart}>
                Restart
            </button>
        </div>
    );
}
