export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
}