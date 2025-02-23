import { atomEffect } from 'jotai-effect';

import { restartGameAtom } from '../game';

export const keyboardEffect = atomEffect((get, set) => {
    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'r':
                set(restartGameAtom);
                break;
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
});
