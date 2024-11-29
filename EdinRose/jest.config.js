export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json' 
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};