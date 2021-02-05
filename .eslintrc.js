module.exports = {
  root: true,
  extends: ["eslint-config-prettify-base"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
};
