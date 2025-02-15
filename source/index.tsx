import './style.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

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
