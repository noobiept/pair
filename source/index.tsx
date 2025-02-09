import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Main } from './main';

const root = createRoot(document.getElementById('App')!);
root.render(
    <StrictMode>
        <Main />
    </StrictMode>,
);
