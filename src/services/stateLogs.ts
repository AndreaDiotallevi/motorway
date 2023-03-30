import { StateLog } from "../models"

export const getStateLogsByVehicleId = async ({
    vehicleId,
}: {
    vehicleId: string
}): Promise<StateLog[]> => {
    const stateLogs = await StateLog.findAll({ where: { vehicleId } })

    return stateLogs
}

export const getRelevantStateLogForTimestamp = async ({
    stateLogs,
    timestamp,
}: {
    stateLogs: StateLog[]
    timestamp: string
}): Promise<StateLog | null> => {
    const date = new Date(timestamp)

    stateLogs.reverse().forEach((stateLog) => {
        const stateLogDate = new Date(stateLog.timestamp)

        if (date.getTime() >= stateLogDate.getTime()) {
            return stateLog
        }
    })

    return null
}
