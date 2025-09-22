// eslint-config.js (현재 파일)
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  { linterOptions: { reportUnusedDisableDirectives: true } },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-unreachable": "warn",
    },
  },

  {
    plugins: { "unused-imports": unusedImports },
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // ================================
  // 타입 불일치 실시간 경고 추가
  // ================================
  {
    files: ["**/*.{ts,tsx}"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json", // tsconfig 위치
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off", // 필요시
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
    },
  },
];

export default eslintConfig;
