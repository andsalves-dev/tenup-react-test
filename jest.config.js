module.exports = {
  "moduleNameMapper": {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^state/(.*)$": "<rootDir>/src/state/$1",
    "^util/(.*)$": "<rootDir>/src/util/$1",
  },
  "setupFiles": ["<rootDir>/jest.setup.js"]
}
