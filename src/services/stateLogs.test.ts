import { StateLog } from "../models"
import { getStateForTimestamp } from "./stateLogs"

const stateLogs: StateLog["dataValues"][] = [
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

it("should return the state the vehicle was at the given timestamp", async () => {
    const state = getStateForTimestamp({
        stateLogs: [...stateLogs],
        timestamp: "2022-09-11 10:00:00+00",
    })

    expect(state).toEqual("quoted")
})

it("should return the state the vehicle was at the given timestamp", async () => {
    const state = getStateForTimestamp({
        stateLogs: [...stateLogs],
        timestamp: "2022-09-12 10:00:00+00",
    })

    expect(state).toEqual("selling")
})

it("should return the state the vehicle was at the given timestamp", async () => {
    const state = getStateForTimestamp({
        stateLogs: [...stateLogs],
        timestamp: "2022-09-12 13:00:00+00",
    })

    expect(state).toEqual("sold")
})

it("should return 'null' if the vehicle didn't exist at the given timestamp", async () => {
    const state = getStateForTimestamp({
        stateLogs: [...stateLogs],
        timestamp: "2021-09-12 10:00:00+00",
    })

    expect(state).toEqual(null)
})
