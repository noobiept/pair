import { useAtom } from 'jotai';

import { BottomMenu } from './components/bottom-menu/bottom-menu';
import { Dialog } from './components/dialog/dialog';
import { Grid } from './components/grid/grid';
import { Message } from './components/message/message';
import { TopMenu } from './components/top-menu/top-menu';
import { gameEffect, restartGameEffect } from './modules/game';

export function App() {
    useAtom(gameEffect);
    useAtom(restartGameEffect);

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
