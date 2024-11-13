module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/pages/**/*.{js,jsx}',  // Collect coverage for all JS/JSX files in the `pages` folder
    '!src/pages/**/*.test.{js,jsx}',  // Exclude test files from coverage
  ],
  coverageDirectory: 'coverage',  // Directory to store coverage reports
  coverageReporters: ['text', 'lcov'],  // Coverage report format
};
