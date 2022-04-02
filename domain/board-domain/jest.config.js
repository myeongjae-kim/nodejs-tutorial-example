/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/index.ts",
    "<rootDir>/src/applicationContext.ts",
  ],
  collectCoverageFrom: ["<rootDir>/src/**", "!**/__test__/**"],
};
