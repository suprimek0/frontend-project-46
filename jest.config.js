export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  // Настройки покрытия
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'json', 'text'],
  // Генерация XML для SonarQube
  reporters: [
    'default',
    ['jest-sonar-reporter', {
      outputFile: 'coverage/test-results.xml',
      coverageFolder: 'coverage',
      reportPath: 'coverage',
      reportFile: 'test-results.xml'
    }]
  ]
};