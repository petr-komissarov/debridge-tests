import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import {defineConfig, globalIgnores} from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import {readFileSync} from "node:fs";
import {parse} from "parse-gitignore";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(parse(readFileSync(".gitignore")).patterns),
    {
        extends: ["js/recommended"],
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {globals: globals.browser},
        plugins: {js}
    },
    tseslint.configs.recommended,
    {
        extends: ["json/recommended"],
        files: ["**/*.json"],
        language: "json/json",
        plugins: {json}
    },
    {
        extends: ["json/recommended"],
        files: ["**/*.jsonc"],
        language: "json/jsonc",
        plugins: {json}
    },
    {
        extends: ["json/recommended"],
        files: ["**/*.json5"],
        language: "json/json5",
        plugins: {json}
    },
    {
        extends: ["markdown/recommended"],
        files: ["**/*.md"],
        language: "markdown/commonmark",
        plugins: {markdown}
    },
    eslintConfigPrettier,
    {rules: {"@typescript-eslint/no-explicit-any": "off"}}
]);
