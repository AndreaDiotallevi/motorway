import { Router } from "express"
import { getVehicleByIdAndTimestamp } from "../controllers"
import { cacheData } from "../middlewares"

const vehiclesRouter = Router()

vehiclesRouter.get("/:vehicleId/timestamp/:timestamp", cacheData, getVehicleByIdAndTimestamp)

export default vehiclesRouter
