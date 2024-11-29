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
      "src/**/*.{ts,tsx}", // Qué archivos incluir
      "!src/**/*.d.ts",    // Excluir definiciones de TypeScript
      "!src/**/index.ts",  // Excluir archivos de exportación simples
      "!src/**/__test__/**", // Excluir archivos de prueba
    ],
    coverageDirectory: "coverage", // Carpeta donde se almacenará el reporte
    coverageReporters: ["html", "text-summary"], // Formatos de reportenpm test -- --coverage

};
