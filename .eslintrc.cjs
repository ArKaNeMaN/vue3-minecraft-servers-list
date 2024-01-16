/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'plugin:tailwindcss/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    overrides: [
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
        },
    ],
    rules: {
        'tailwindcss/no-custom-classname': 'off',
    },
}
