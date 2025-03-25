module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Assurez-vous que jsdom est configuré
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',  // Transformation avec babel-jest
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
  