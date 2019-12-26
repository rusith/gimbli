module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|js)",
    "**/?(*.)+(spec|test).+(ts|js)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.ts"
  ],
  "coveragePathIgnorePatterns": [
    "<rootDir>/node_modules"
  ],
  "coverageReporters": [
    "json",
    "text"
  ],
  "coverageDirectory": "<rootDir>/coverage/",
  "testEnvironment": "node",
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ]
};