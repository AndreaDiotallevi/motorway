import type { Config } from "@jest/types"

// Sync object
const config: Config.InitialOptions = {
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.json",
        },
    },
    preset: "ts-jest",
    rootDir: "src",
    verbose: true,
}

export default config
