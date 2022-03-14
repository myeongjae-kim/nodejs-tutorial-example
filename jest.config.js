/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverageFrom: ["<rootDir>/src/**", "!**/__test__/**"],
};
