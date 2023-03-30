import { Request, Response } from "express"
import { getVehicleById, getStateLogsByVehicleId, getRelevantStateLogForTimestamp } from "../services"

export const getStateByVehicleIdAndTimestamp = async (req: Request, res: Response) => {
    const { vehicleId, timestamp } = req.params

    try {
        const vehicle = await getVehicleById({ id: vehicleId })

        if (!vehicle) {
            return res.status(404).send({ error: "Vehicle not found" })
        }

        const stateLogs = await getStateLogsByVehicleId({ vehicleId })
        const relevantStateLog = await getRelevantStateLogForTimestamp({ stateLogs, timestamp })

        if (!relevantStateLog) {
            return res.status(404).send({ error: "State log for this vehicle and timestamp not found" })
        }

        res.sendStatus(200).send({ data: { ...vehicle.dataValues, state: relevantStateLog.state } })
    } catch (err) {
        console.log("Error getting state by vehicle id and timestamp")
        console.log(err)

        res.sendStatus(500).send({ error: err })
    }
}
