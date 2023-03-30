import { Request, Response } from "express"
import { getVehicleById, getStateLogsByVehicleId, getStateLogForTimestamp } from "../services"

export const getVehicleByIdAndTimestamp = async (req: Request, res: Response) => {
    const { vehicleId, timestamp } = req.params

    try {
        const vehicle = await getVehicleById({ vehicleId })

        if (!vehicle) {
            return res.status(404).send({ error: "No vehicle with this id" })
        }

        const stateLogs = await getStateLogsByVehicleId({ vehicleId })
        const activeStateLog = getStateLogForTimestamp({ stateLogs, timestamp })

        if (!activeStateLog) {
            return res.status(404).send({ error: "No state log with vehicle id and timestamp" })
        }

        res.json({ data: { vehicle: { ...vehicle.dataValues, state: activeStateLog.state } } })
    } catch (err) {
        console.log("Error getting vehicle state for this timestamp")
        console.log(err)

        res.status(500).send({ error: err })
    }
}
