import { Router, Request, Response } from "express"
import { StateLog } from "../../db/models"

const vehiclesRouter = Router()

vehiclesRouter.get("/", async (req: Request, res: Response) => {
    const stateLog = await StateLog.findAll({ where: { vehicleId: 1 } })

    return res.status(200).send(stateLog)
})

export default vehiclesRouter
