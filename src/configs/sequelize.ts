import { Dialect, Sequelize } from "sequelize"

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST as string
const dbDialect = process.env.DB_DIALECT as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    port: 5432,
    host: dbHost,
    dialect: dbDialect,
})

export default sequelize
