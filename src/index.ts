import { app } from "./app"
import sequelize from "./configs/sequelize"

const port = process.env.PORT || 3000

try {
    sequelize.authenticate()
    console.log("Connection has been established successfully.")
} catch (error) {
    console.error("Unable to connect to the database:", error)
}

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    console.error(`Error occurred: ${error}`)
}
