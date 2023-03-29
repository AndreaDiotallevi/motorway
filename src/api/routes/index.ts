import { Router } from "express"
import vehiclesRouter from "./vehicles"
import stateLogsRouter from "./stateLogs"

const router = Router()

router.use("/vehicles", vehiclesRouter)
router.use("/stateLogs", stateLogsRouter)

export default router
