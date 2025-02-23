import { useAtom } from 'jotai';

import { BottomMenu } from './components/bottom-menu/bottom-menu';
import { Dialog } from './components/dialog/dialog';
import { Grid } from './components/grid/grid';
import { Message } from './components/message/message';
import { TopMenu } from './components/top-menu/top-menu';
import { gameEffect, restartGameEffect } from './modules/game';
import { keyboardEffect } from './modules/keyboard';

export function App() {
    useAtom(gameEffect);
    useAtom(restartGameEffect);
    useAtom(keyboardEffect);

    return (
        <>
            <Message />
            <Dialog />
            <TopMenu />
            <Grid />
            <BottomMenu />
        </>
    );
}
