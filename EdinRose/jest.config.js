export default {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // "^.+\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
    // '\\.(css|scss)$': 'jest-transform-stuccb', // Para estilos.
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],

    // Habilitar el reporte de cobertura
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.ts", // Incluye todos los archivos TypeScript dentro de src/
      "!src/**/*.test.ts", // Excluye los archivos de prueba
      "!src/**/*.mock.ts", // Excluye mocks
    ],
    coverageDirectory: "coverage", // Carpeta donde se almacenará el reporte
    coverageReporters: ["html", "text-summary"], // Formatos de reportenpm test -- --coverage
    verbose: true, // Muestra detalles de las pruebas
    silent: false, // Permite que se muestren los console.log
};
