import { DEFAULT_CONFIG } from './config.const';
import { Config } from './config.types';
import { atomWithStorage } from 'jotai/utils';

export const configAtom = atomWithStorage<Config>(
    'pair_config',
    DEFAULT_CONFIG,
);
