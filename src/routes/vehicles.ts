import { Router } from "express"
import { getVehicleByIdAndTimestamp } from "../controllers"

const vehiclesRouter = Router()

vehiclesRouter.get("/:vehicleId/timestamp/:timestamp", getVehicleByIdAndTimestamp)

export default vehiclesRouter
