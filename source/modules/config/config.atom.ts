import { atomWithStorage } from 'jotai/utils';

import { DEFAULT_CONFIG } from './config.const';
import { Config } from './config.types';

export const configAtom = atomWithStorage<Config>(
    'pair_config',
    DEFAULT_CONFIG,
);
