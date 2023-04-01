import { Dialect, Options, Sequelize } from "sequelize"

enum NodeEnvironment {
    Development = "development",
    Test = "test",
    Production = "production",
}

const config: Record<
    NodeEnvironment,
    {
        name: string
        user: string
        password: string
        options: Options
    }
> = {
    development: {
        name: process.env.DB_NAME as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        options: {
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST as string,
            dialect: process.env.DB_DIALECT as Dialect,
        },
    },
    test: {
        name: "motorway",
        user: "user",
        password: "password",
        options: {
            port: 5432,
            host: "db-test",
            dialect: "postgres",
        },
    },
    production: {
        name: process.env.DB_NAME as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        options: {
            port: Number(process.env.DB_PORT),
            host: process.env.DB_HOST as string,
            dialect: process.env.DB_DIALECT as Dialect,
        },
    },
}

const nodeEnv = process.env.NODE_ENV as NodeEnvironment
const { name, user, password, options } = config[nodeEnv]
const sequelize = new Sequelize(name, user, password, options)

export default sequelize
