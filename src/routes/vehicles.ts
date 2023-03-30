import { Router } from "express"
import { getStateByVehicleIdAndTimestamp } from "../controllers"

const vehiclesRouter = Router()

vehiclesRouter.get("/:vehicleId/timestamp/:timestamp", getStateByVehicleIdAndTimestamp)

export default vehiclesRouter
