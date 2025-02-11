import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BottomMenu } from './components/bottom-menu';
import { TopMenu } from './components/top-menu';
import { Dialog } from './components/dialog';
import { Message } from './components/message';
import { Grid } from './components/grid';

import './style.css';

const root = createRoot(document.getElementById('App')!);
root.render(
    <StrictMode>
        <Message />
        <Dialog />
        <TopMenu />
        <Grid />
        <BottomMenu />
    </StrictMode>,
);
