module.exports = {
  roots: [
    '<rootDir>/lib',
    '<rootDir>/test'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/coverage',
  testMatch: [ '<rootDir>/test/specs/*.spec.js' ],
  testPathIgnorePatterns: [ '/node_modules/' ],
  verbose: true
};
