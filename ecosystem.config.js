module.exports = [
    {
        script: "dist/src/index.js",
        name: "app",
        exec_mode: "cluster",
        instances: "max",
    },
]
