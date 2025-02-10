import { atom } from 'jotai';
import { DEFAULT_CONFIG } from './config.const';
import { Config } from './config.types';

export const configAtom = atom<Config>(DEFAULT_CONFIG);
