import { StateLog } from "../models"

export const getStateLogsByVehicleId = async ({
    vehicleId,
}: {
    vehicleId: string
}): Promise<StateLog[]> => {
    const stateLogs = await StateLog.findAll({ where: { vehicleId } })

    return stateLogs
}

export const getStateLogForTimestamp = ({
    stateLogs,
    timestamp,
}: {
    stateLogs: StateLog[]
    timestamp: string
}): StateLog | null => {
    const date = new Date(timestamp)

    for (const stateLog of stateLogs.reverse()) {
        const stateLogDate = new Date(stateLog.timestamp)

        if (date.getTime() >= stateLogDate.getTime()) {
            return stateLog
        }
    }

    return null
}
