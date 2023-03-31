import { NextFunction, Request, Response } from "express"
import { createClient } from "redis"

export const redisClient = createClient({
    url: "redis://default:password@redis-cache:6379",
})

redisClient.on("error", (err) => console.error("Redis Client Error", err))

try {
    redisClient.connect()
} catch (err) {
    console.error(err)
}

export const cacheData = async (req: Request, res: Response, next: NextFunction) => {
    const { vehicleId, timestamp } = req.params
    const cacheKey = vehicleId + timestamp

    try {
        const cacheData = await redisClient.get(cacheKey)

        if (cacheData) {
            const result = JSON.parse(cacheData)
            res.send({ fromCache: true, data: result })
        } else {
            next()
        }
    } catch (error) {
        console.log("Error getting data from the cache")
        console.error(error)

        res.status(404)
    }
}
