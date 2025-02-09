import eslint from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default [
    {
        ignores: ['release/', 'webpack.config.js'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
];
