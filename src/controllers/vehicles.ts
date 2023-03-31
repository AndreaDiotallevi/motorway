import { Request, Response } from "express"
import { getVehicleById, getStateLogsByVehicleId, getStateForTimestamp } from "../services"

export const getVehicleByIdAndTimestamp = async (req: Request, res: Response) => {
    const { vehicleId, timestamp } = req.params

    try {
        const vehicle = await getVehicleById({ vehicleId })

        if (!vehicle) {
            return res.status(404).send({ error: "No vehicle with this id" })
        }

        const stateLogs = await getStateLogsByVehicleId({ vehicleId })
        const state = getStateForTimestamp({ stateLogs, timestamp })

        if (!state) {
            return res.status(404).send({ error: "Vehicle didn't exist at this timestamp" })
        }

        res.json({ data: { vehicle: { ...vehicle.dataValues, state } } })
    } catch (err) {
        console.log("Error getting vehicle state for this timestamp")
        console.error(err)

        res.status(500).send({ error: "Could not get vehicle state for this timestamp" })
    }
}
