import { atom } from 'jotai';

import type { DialogState } from './dialog.types';

export const dialogAtom = atom<DialogState | undefined>(undefined);
