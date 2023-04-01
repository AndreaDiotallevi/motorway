<!-- Install requirements:
 - docker (https://docs.docker.com/get-docker/)

To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database. By default the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`. -->

# Senior Backend Engineer Tech Challenge

## Description

Please download below the starter package to save you time with the basic setup of this challenge.

-   You'll need Docker to spin up the test database.
-   You may use any package you like.
-   You may use JavaScript or TypeScript.

Inside this package, you will find a git project containing a Docker file that will bring up a Postgres database containing 2 tables: `vehicles` and `stateLogs`. These tables are already populated with some sample data.

The `vehicles` table has the data of cars that Motorway has sold in the past, or is in the process of selling. The vehicle's current state is defined in the `state` field. The state defines the lifecycle of a vehicle, from quoted to selling and sold.

The `stateLogs` table has the history of each vehicle's state transitions, from the moment it was created with the quoted state, to the most recent state transition.

Your task is to build an API with Node.js that, based on a vehicle id and a timestamp, returns a vehicle's information and the vehicle's state on the given timestamp.

For example, for the following `stateLogs`:

```js
;[
    {
        vehicleId: 3,
        state: "quoted",
        timestamp: "2022-09-11 09:11:45+00",
    },
    {
        vehicleId: 3,
        state: "selling",
        timestamp: "2022-09-11 23:21:38+00",
    },
    {
        vehicleId: 3,
        state: "sold",
        timestamp: "2022-09-12 12:41:41+00",
    },
]
```

if the API receives the timestamp `2022-09-12 10:00:00+00`, the response is the vehicle data, and the state of `selling` because it's the state that the vehicle was on that point in time.

Imagine this API endpoint is in a production environment and can be hit multiple times a second. It’s acceptable that clients can get a response stale by 1 minute.

Please prepare your project as you would for a production environment, considering reliability (this app would run in multiple instances), and testing.
