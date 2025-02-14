import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { configAtom } from '../../modules/config';

export function useBottomMenu() {
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
    const onRestart = useCallback(() => {
        setConfig({
            ...config,
        });
    }, []);

    return {
        config,
        onColumnsChange,
        onLinesChange,
        onImagesUsedChange,
        onRestart,
    };
}
