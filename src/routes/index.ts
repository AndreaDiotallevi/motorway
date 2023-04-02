import { Router } from "express"
import vehiclesRouter from "./vehicles"

const router = Router()

router.use("/vehicles", vehiclesRouter)
console.log("test")

export default router
