import { Vehicle } from "../models"

export const getVehicleById = async ({ vehicleId }: { vehicleId: string }): Promise<Vehicle | null> => {
    const vehicle = await Vehicle.findOne({ where: { id: vehicleId } })

    return vehicle
}
