import { useAtom } from 'jotai';
import { configAtom } from '../modules/config';
import { useCallback } from 'react';

export function BottomMenu() {
    const [config, setConfig] = useAtom(configAtom);

    const onColumnsChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.valueAsNumber;

            // we can't have an odd total number of tiles (because we need to add tiles in pairs)
            // so we need to check if the new column/line combination isn't going to lead to an odd number of tiles
            // as long as one of them is even, we're good (can't have both being odd)
            if (value % 2 !== 0 && config.lines % 2 !== 0) {
                // when they're both odd, we need to turn one of them into an even number
                value++;
            }

            setConfig({
                ...config,
                columns: value,
            });
        },
        [],
    );
    const onLinesChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = event.target.valueAsNumber;

            // check the comment above (in columns 'change' listener)
            if (value % 2 !== 0 && config.columns % 2 !== 0) {
                value++;
            }

            setConfig({
                ...config,
                lines: value,
            });
        },
        [],
    );
    const onImagesUsedChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                imagesUsed: event.target.valueAsNumber,
            });
        },
        [],
    );

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

            <button id="Restart">Restart</button>
        </div>
    );
}
