import { Router, Request, Response } from "express"
import { Vehicle } from "../../db/models"
// import * as vehicleController from "../controllers/vehicle"
// import { CreateVehicleDTO, FilterVehiclesDTO, UpdateVehicleDTO } from "../dto/vehicle.dto"

const vehiclesRouter = Router()

// vehiclesRouter.get(":/id", async (req: Request, res: Response) => {
//     const id = Number(req.params.id)
//     console.log("HERE")
//     return res.status(200).send("Test")
//     // const result = await vehicleController.getById(id)
//     // return res.status(200).send(result)
// })
// vehiclesRouter.put("/:id", async (req: Request, res: Response) => {
//     const id = Number(req.params.id)
//     const payload: UpdateVehicleDTO = req.body

//     const result = await vehicleController.update(id, payload)
//     return res.status(201).send(result)
// })
// vehiclesRouter.delete("/:id", async (req: Request, res: Response) => {
//     const id = Number(req.params.id)

//     const result = await vehicleController.deleteById(id)
//     return res.status(204).send({
//         success: result,
//     })
// })
// vehiclesRouter.post("/", async (req: Request, res: Response) => {
//     const payload: CreateVehicleDTO = req.body
//     const result = await vehicleController.create(payload)
//     return res.status(200).send(result)
// })
vehiclesRouter.get("/", async (req: Request, res: Response) => {
    const vehicles = await Vehicle.findAll()
    console.log(vehicles)
    return res.status(200).send(vehicles)
    // const filters: FilterVehiclesDTO = req.query
    // const results = await vehicleController.getAll(filters)
    // return res.status(200).send(results)
})

export default vehiclesRouter
