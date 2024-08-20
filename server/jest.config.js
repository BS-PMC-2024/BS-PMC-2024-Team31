module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/src/test/**/*.test.js'],
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
  };
  