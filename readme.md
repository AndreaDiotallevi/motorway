<!-- Install requirements:
 - docker (https://docs.docker.com/get-docker/)

To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database. By default the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`. -->

# Senior Backend Engineer Tech Challenge

## 1. Description

Please download below the starter package to save you time with the basic setup of this challenge.

-   You'll need Docker to spin up the test database.
-   You may use any package you like.
-   You may use JavaScript or TypeScript.

Inside this package, you will find a git project containing a Docker file that will bring up a Postgres database containing 2 tables: `vehicles` and `stateLogs`. These tables are already populated with some sample data.

The `vehicles` table has the data of cars that Motorway has sold in the past, or is in the process of selling. The vehicle's current state is defined in the `state` field. The state defines the lifecycle of a vehicle, from quoted to selling and sold.

The `stateLogs` table has the history of each vehicle's state transitions, from the moment it was created with the quoted state, to the most recent state transition.

Your task is to build an API with Node.js that, based on a vehicle id and a timestamp, returns a vehicle's information and the vehicle's state on the given timestamp.

For example, for the following `stateLogs`:

```json
[
    {
        "vehicleId": 3,
        "state": "quoted",
        "timestamp": "2022-09-11 09:11:45+00"
    },
    {
        "vehicleId": 3,
        "state": "selling",
        "timestamp": "2022-09-11 23:21:38+00"
    },
    {
        "vehicleId": 3,
        "state": "sold",
        "timestamp": "2022-09-12 12:41:41+00"
    }
]
```

if the API receives the timestamp `2022-09-12 10:00:00+00`, the response is the vehicle data, and the state of `selling` because it's the state that the vehicle was on that point in time.

Imagine this API endpoint is in a production environment and can be hit multiple times a second. It’s acceptable that clients can get a response stale by 1 minute.

Please prepare your project as you would for a production environment, considering reliability (this app would run in multiple instances), and testing.

## 2. Initial thoughts on the requirements

After reading the requirements mulitple times, I have started making some design considerations.

### 2.1 Run postgres database in Docker

Two options came to mind:

1. A serverless application with Amazon RDS for PostgreSQL, fronted by a database proxy, with AWS Lambda and API Gateway
2. A containerised application with services running in Docker containers

The best database for serverless applications is DynamoDB, since it can scale infinitely as well as Lambda. RDS databases, on the other hand, are not designed to accept the same number of concurrent connections - needing a database proxy in front of them.

This is why I have chosen to go for a containerised approach, with services running in Docker containers.

### 2.2 Build an API

Three options came to mind:

-   REST API with AWS API Gateway
-   REST API with Express
-   GraphQL API

There were no requirements to justify going for a GraphQL API.

Because of the same reason I have explained above, I have opted to avoid using API Gateway. As a Node.js server, I have chosen Express.js since it is already used at Motorway.

### 2.3 Accept stale response by 1 minute

Two options came to mind:

-   Amazon DynamoDB Accelerator (DAX)
-   Redis in-memory cache

Since I am not going for a serverless approach, I have picked Redis, which is also a caching technology already used at Motorway.

### 2.4 Ensure reliability

To ensure reliability, the application will need to be deployed in multiple availability zones.

### 2.5 Handle concurrent requests

Given the API endpoint is going to be hit by multiple users per seconds, the system needs to handle multiple instances running at the same time. This can be handled by horizontal scaling, using AWS autoscaling groups in tandem with a production process manager like pm2.

## 3. Architecture

Locally the application runs in Docker. Docker compose is used to spin up 4 services: `api` (Express server), `db` (development postgres database), `db-test` (test postgres database) and `redis-cache` (caching database).

1. Clone the repository and run `npm install`
2. Then, run `docker-compose build` to build the Docker image
3. Then, run `docker-compose up` to start up the services and seed the databases
4. The server should be up and running at `http://localhost:3000/`
5. Test the API endpoint with this query `http://localhost:3000/vehicles/2/timestamp/2022-09-19%2010:00:00+00`
6. The first time, it should return this data

```json
{
    "fromCache": false,
    "data": {
        "vehicle": {
            "id": 2,
            "make": "AUDI",
            "model": "A4",
            "state": "selling"
        }
    }
}
```

7. The second time, it should return `"fromCache": true`

```json
{
    "fromCache": true,
    "data": {
        "vehicle": {
            "id": 2,
            "make": "AUDI",
            "model": "A4",
            "state": "selling"
        }
    }
}
```

<!--



### 3.1 Development environment

### 3.2 Production environment

## 3. System design overview

#### 3.1 Coding language

I have used `TypeScript` because of its:

-   reliability
-   productivity
-   type safety at compile time

#### 3.2 API

I have built a REST Api with one endpoint that fulfils the test requirement.

_"Based on a vehicle id and a timestamp, returns a vehicle's information and the vehicle's state on the given timestamp."_

-   Since the resource we want to return is a `Vehicle`, the url starts with the resource plural name and id parameter: `/vehicles/:vehicleId`
-   Since we want to return the state the vehicle was at a given timestamp, the url becomes: `vehicles/:vehicleId/timestamp/:timestamp`
-   Since it is a query the HTTP method is **GET**
-   This follows RESTful principles like:

    -   **client-server architecture**: the client and the server both have a different set of concerns
    -   **stateless**: the communication between the client and the server always contains all the information needed to perform the request
    -   **cacheble**: the client, the server and any intermediary components can all cache resources in order to improve performance
    -   **uniform interface**: all components follow the same rules to speak to one another
    -   **layered system**: individual components cannot see beyond the immediate layer with which they are interacting

-   Example response for `http://localhost:3000/vehicles/2/timestamp/2022-09-19%2010:00:00+00`

```json
{
    "fromCache": false,
    "data": {
        "vehicle": {
            "id": 2,
            "make": "AUDI",
            "model": "A4",
            "state": "selling"
        }
    }
}
```

#### 3.3 Server

Since Motorway already uses Express, I have implemented an `Express` server in Node.js and TypeScript. With `docker-compose` I have created a service called `api` that runs locally on port `3000`.

#### 3.4 Database

Since the requirements contain a postgres database with seed data, I have created a `postgres` service with `docker-compose` named `db`.

#### 3.5 ORM

Although not a requirement, I have decided to experiment with `Sequelize`, since it's the ORM of choice used at Motorway. It's the first time I have used this, since at my current company we use Prisma.

Following the postgres seed file, I have created two model classes: `Vehicle` and `StateLog`.

#### 3.6 Caching

The requirements states:

_Imagine this API endpoint is in a production environment and can be hit multiple times a second. It’s acceptable that clients can get a response stale by 1 minute._

The first thing that came to mind was caching. Since Motorway already uses `Redis` I have implemented a Redis service that stores the query response with a TTL of 1 minute.

The principle is:

-   The user makes an API request
-   Does Redis contain the asking query?
-   If yes, return that straight away
-   If not, make the database queries and, before returning, save that in Redis with a key of `vehicleId + timestamp`

```ts
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
```

#### 3.7 Containerised application?

#### 3.8 Serverless application?

## 4. Architecture

#### 4.1 Development

#### 4.2 Production

## 5. Testing

#### 5.1 Static linting

#### 5.2 Unit testing

## 6 Deployment

#### 6.1 Environments

#### 6.2 Cloud provider

#### 6.3 CI / CD pipelines

## 6. Technologies

## 7. Time schedule

I have worked on this tech test roughly 1 - 2 hours a day in the evenings.

-   Monday 27th March
    -   Call with Motorway internal recruiter
-   Tuesday 28th March
    -   Setup Express server
    -   Setup folder structure with routes, controllers and services
-   Wednesday 29th March
    -   Setup Sequelize models
    -   Design REST Api
-   Thursday 30th March
    -   Setup Jest testing
    -   Complete business logic and unit tests
-   Friday 31st March
    -   Setup Redis cache to work as Express middleware
-   Saturday 1st April
    -   Start readme
-   Sunday 2nd April
-   Monday 3rd April

## 8. What I would add if I had more time

#### 8.1 Infrastructure as code with Terraform

#### 8.2 Testing for API routers and controllers

#### 8.3 Different AWS account for each deployment environment

## 9. Takeways

#### 9.1 I loved the challenge
 -->
<!-- #### 9.2 I learned more about Motorway -->

<!--
#### 2.1 Technical requirements

#### 2.2 Motorway current technology stack [[link]](https://stackshare.io/motorway/core-platform)

#### 2.3 Motorway company values [[link]](https://www.notion.so/Motorway-Product-Engineering-culture-guide-42f8aee810d74ad3a4496fca520ae147)

#### 2.4 Time constraint

The fact that I had a maximum of 7 days to complete the challenge made me approach the test in a more pragmatic way:

-   Focus on the big picture first
-   Have an idea of what I would like to achieve every day
-   Decribe what I would do if I had more time -->
