module.exports = {
  root: true,
  extends: [
    "@rushstack/eslint-config/profile/node",
    "@rushstack/eslint-config/mixins/friendly-locals",
  ],
  rules: {
    "no-void": ["error", { allowAsStatement: true }],
  },
};
