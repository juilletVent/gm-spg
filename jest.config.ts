const path = require("path");

module.exports = {
  rootDir: path.join(__dirname),
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.(spec|test).(t|j)s"],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    "^.+\\.js$": "babel-jest",
    "^.+\\.(ts)$": "ts-jest",
  },
  // 如果需要使用babel-js处理外部库，请将外部库定义在这里
  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!(lodash-es|other-es-lib))",
  // ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/typeings/",
    "<rootDir>/src/tpl/",
    "<rootDir>/src/conf/",
    "<rootDir>/src/types/",
    "<rootDir>/src/components/",
    "<rootDir>/dist/",
    "<rootDir>/.easy-mock.js",
  ],
};
