import type { Config } from "@jest/types"

// Sync object
const config: Config.InitialOptions = {
    rootDir: "src",
    verbose: true,
    transform: {
        "^.+\\.ts?$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
    },
    collectCoverage: true,
    coverageDirectory: "../coverage",
}

export default config
