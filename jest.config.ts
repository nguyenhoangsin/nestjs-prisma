import type { Config } from 'jest';

const config: Config = {
  rootDir: 'src',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Test discovery
  testMatch: ['<rootDir>/**/*.spec.ts'],
  testPathIgnorePatterns: [
    '^<rootDir>/auth/',
    '^<rootDir>/bootstrap/',
    '^<rootDir>/common/',
    '^<rootDir>/config/',
    '^<rootDir>/database/',
    '^<rootDir>/graphql/',
    '^<rootDir>/middleware/',
    '^<rootDir>/shared/',
  ],

  // Coverage
  collectCoverageFrom: [
    // Files to include
    '<rootDir>/**/*.ts',
    // Directories to exclude
    '!<rootDir>/auth/**',
    '!<rootDir>/bootstrap/**',
    '!<rootDir>/common/**',
    '!<rootDir>/config/**',
    '!<rootDir>/database/**',
    '!<rootDir>/graphql/**',
    '!<rootDir>/middleware/**',
    '!<rootDir>/shared/**',
    // Files to exclude
    '!<rootDir>/**/*.abstract.ts',
    '!<rootDir>/**/*.api.ts',
    '!<rootDir>/**/*.config.ts',
    '!<rootDir>/**/*.constant.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/*.decorator.ts',
    '!<rootDir>/**/*.dto.ts',
    '!<rootDir>/**/*.entity.ts',
    '!<rootDir>/**/*.enum.ts',
    '!<rootDir>/**/*.filter.ts',
    '!<rootDir>/**/*.generated.*',
    '!<rootDir>/**/*.guard.ts',
    '!<rootDir>/**/*.interceptor.ts',
    '!<rootDir>/**/*.interface.ts',
    '!<rootDir>/**/*.mapper.ts',
    '!<rootDir>/**/*.middleware.ts',
    '!<rootDir>/**/*.mock.ts',
    '!<rootDir>/**/*.model.ts',
    '!<rootDir>/**/*.module.ts',
    '!<rootDir>/**/*.pipe.ts',
    '!<rootDir>/**/*.repository.ts',
    '!<rootDir>/**/*.scalar.ts',
    '!<rootDir>/**/*.spec.ts',
    '!<rootDir>/**/*.type.ts',
    '!<rootDir>/**/*.util.ts',
    '!<rootDir>/main.ts',
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['cobertura', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  reporters: [
    'default',
    // ['jest-junit', { outputDirectory: './coverage/test-results', outputName: 'jest-junit.xml' }],
  ],
};

export default config;
