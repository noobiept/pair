import eslint from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.{ts,tsx}'],
    },
    {
        ignores: ['release/', 'webpack.config.js'],
    },
    {
        settings: { react: { version: 'detect' } },
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
        plugins: {
            'react-hooks': reactHooks,
            'simple-import-sort': simpleSort,
        },
    },
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            ...reactHooks.configs.recommended.rules,
        },
    },
];
