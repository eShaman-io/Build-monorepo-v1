module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  projects: ["<rootDir>/apps/*", "<rootDir>/packages/*"],
  coverageReporters: ["json", "lcov"],
};
