module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
      "^@app/(.*)$": "<rootDir>/src/application/$1",
      "^@infra/(.*)$": "<rootDir>/src/infra/$1",
      "^@config/(.*)$": "<rootDir>/src/config/$1",
      "^@domain/(.*)$": "<rootDir>/src/domain/$1",
      "^@db/(.*)$": "<rootDir>/src/db/$1",
      "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
      "^@shared/(.*)$": "<rootDir>/src/shared/$1",
      "^@test/(.*)$": "<rootDir>/test/$1"
    },
    globals: {
      "ts-jest": {
        "tsconfig": "tsconfig.jest.json"
      }
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "src/domain/entities/",  // Ignora entities
      "src/migrations/",       // Ignora migrations
      "src/config/",           // Ignora arquivos de configuração
      "src/main.ts",           // Ignora a inicialização do app
      "src/shared/base.entity.ts"
    ]
};
  