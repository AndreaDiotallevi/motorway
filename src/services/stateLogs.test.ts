import { app } from "../app"
import { StateLogAttributes } from "../models"
import { getStateLogForTimestamp } from "./stateLogs"

it("test", async () => {
    const stateLogs: StateLogAttributes[] = [
        {
            id: 1,
            vehicleId: 3,
            state: "quoted",
            timestamp: "2022-09-11 09:11:45+00",
        },
        {
            id: 2,
            vehicleId: 3,
            state: "selling",
            timestamp: "2022-09-11 23:21:38+00",
        },
        {
            id: 3,
            vehicleId: 3,
            state: "sold",
            timestamp: "2022-09-12 12:41:41+00",
        },
    ]

    const vehicle = getStateLogForTimestamp({ stateLogs, timestamp: "2022-09-12 10:00:00+00" })

    expect(vehicle?.state).toEqual("selling")
})
