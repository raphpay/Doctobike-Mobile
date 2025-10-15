/** @type {import('jest').Config} */
module.exports = {
  preset: "react-native",
  testEnvironment: "node",

  setupFiles: ["<rootDir>/jest.setup.js"],

  moduleDirectories: ["node_modules", "<rootDir>/src"],

  // 👇 This line is the fix
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // maps "@/src/lib/..." → "<rootDir>/src/lib/..."
  },

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native(-community)?|expo-router|expo(nent)?|@expo(nent)?/.*|@unimodules/.*|unimodules)",
  ],
};
