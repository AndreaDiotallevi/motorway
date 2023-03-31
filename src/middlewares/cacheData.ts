import { NextFunction, Request, Response } from "express"
import { createClient } from "redis"

export const redisClient = createClient({
    url: `redis://${process.env.REDIS_DB_USER}:${process.env.REDIS_DB_PASSWORD}@${process.env.REDIS_DB_NAME}:${process.env.REDIS_DB_PORT}`,
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
