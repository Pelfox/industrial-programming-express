import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  stylistic: false,
  rules: {
    'no-console': 'off',
  },
  ignores: ['./public/**'],
});
