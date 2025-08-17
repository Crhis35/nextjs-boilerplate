import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  }),
];

export default eslintConfig;
