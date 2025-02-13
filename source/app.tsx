import { BottomMenu } from './components/bottom-menu';
import { TopMenu } from './components/top-menu';
import { Dialog } from './components/dialog';
import { Message } from './components/message';
import { Grid } from './components/grid';
import { useAtom } from 'jotai';
import { gameEffect } from './modules/game';

export function App() {
    useAtom(gameEffect);

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
