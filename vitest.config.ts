import {availableParallelism} from "node:os";
import {loadEnv} from "vite";
import {defineConfig} from "vitest/config";

const env = loadEnv("", process.cwd(), "");

export default defineConfig({
    test: {
        dir: "tests",
        env: env,
        maxConcurrency: availableParallelism(),
        name: "Regress",
        passWithNoTests: true,
        reporters: ["allure-vitest/reporter", "default"],
        retry: Number(env.TEST_RETRY),
        setupFiles: ["allure-vitest/setup"],
        testTimeout: Number(env.TEST_TIMEOUT)
    }
});
