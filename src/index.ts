import express, { Application } from "express"
import routes from "./api/routes"

const app: Application = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", routes)

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    console.log(`Error occurred: ${error}`)
}
