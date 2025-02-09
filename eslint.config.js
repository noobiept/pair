import eslint from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
    {
        settings: { react: { version: 'detect' } },
    },
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
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
];
