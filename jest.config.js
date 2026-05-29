export default {
  transform: {},
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.js'],
  modulePathIgnorePatterns: ['<rootDir>/temp_test_workspace', '<rootDir>/temp_command_workspace'],
  testPathIgnorePatterns: ['/node_modules/', '/temp_test_workspace/', '/temp_command_workspace/']
};
