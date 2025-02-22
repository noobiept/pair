import './style.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { initI18n } from './core/i18n';

declare global {
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}

initI18n();

const root = createRoot(document.getElementById('App')!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
