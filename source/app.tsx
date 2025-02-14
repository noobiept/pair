import { BottomMenu } from './components/bottom-menu/bottom-menu';
import { TopMenu } from './components/top-menu';
import { Dialog } from './components/dialog';
import { Message } from './components/message';
import { Grid } from './components/grid';
import { useAtom } from 'jotai';
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
