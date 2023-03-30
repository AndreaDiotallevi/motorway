import { Vehicle } from "../models"

export const getVehicleById = async ({ id }: { id: string }): Promise<Vehicle | null> => {
    const vehicle = await Vehicle.findOne({ where: { id } })

    return vehicle
}
