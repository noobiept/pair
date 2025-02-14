import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './app';

import './style.css';

declare global {
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}

const root = createRoot(document.getElementById('App')!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
