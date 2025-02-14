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
            <span>Columns</span>
            <span id="ColumnsValue">{config.columns}</span>
            <input
                id="Columns"
                type="range"
                min="4"
                max="10"
                value={config.columns}
                onChange={onColumnsChange}
            />

            <span>Lines</span>
            <span id="LinesValue">{config.lines}</span>
            <input
                id="Lines"
                type="range"
                min="4"
                max="10"
                value={config.lines}
                onChange={onLinesChange}
            />

            <span>Images used</span>
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
