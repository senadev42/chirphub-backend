# ChirpHub

ChirpHub is a full-stack application designed to manage smart birdhouses deployed worldwide to monitor bird and egg residency. 

This repository contains the backend application built with NestJS, providing a robust and scalable infrastructure to handle birdhouse registration, updates, and management.

You can find the frontend repo here: https://github.com/senadev42/chirphub-frontend.git


## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/senadev42/chirphub-backend.git
```

2. Navigate to the project directory.

```shell
cd chirphub-backend
```

3. Install dependencies.

```shell
npm install
```

4. Set up environment variables.

Create a .env file based on the .env.example file and provide necessary configurations like database connection details and port. This project uses postgres.

5. Seed the database

```
npm run typeorm:run-seeders
```

You can run `npm run typeorm:revert-seeders` to roll back the seeding or `npm run reseed` to refresh and reset. Seeding is randomized each time.

6. Run the application.

```shell
npm run start:dev
```


## Usage

### Swagger Documentation

Explore the APIs using the Swagger documentation available at: `http://localhost:{port}/api/v1/apidocs`
Replace `{port}` with the port configured in your environment variables.

## Directory Structure

- `src`: Contains the source code of the NestJS application.
  - `app.module.ts`: Main module definition.
  - `birdhouse`: Module for birdhouse-related functionality.
  - `gaurds`: Guards for authentication and authorization.
  - `main.ts`: Entry point of the application.
  - `tasks`: Module for schedules tasks functionality.
  - `utils`: Utility functions and helpers.
- `migrations`: Database migrations.
- `seeders`: Utilizing migrations to seed database (read more below).
- `test`: End-to-end test cases.
- `README.md`: Project documentation.
- Other configuration files (`nest-cli.json`, `package.json`, `tsconfig.json`, etc.).

## Retrospective

I started with the frontend first since I'm less familiar with vue compare to nest and wanted to get that out of the way. Since I started this after getting all the pages set up with a mock json web server, I already had a solid idea of what I wanted the backend to look like.

Database-wise I decided to go with using postgres + typeorm which doesn't have built in seeding compared to other orms, and while there are libraries that cover this gap, they were all either somewhat old and depreciated or new and experimental, so I decided to create a datasource dedicated for seeding and utilize typeorm's migrations for seeding. The seeder was initially just a copy of the mock data I was using for the frontend json web server, but I modified it later to randomly generate new types of birdhouses with randomly set locations, names and residency history.

Since I decided to start with seeding, the entities were the first thing to get made. After getting a set of CRUD controllers for those entities set up with nest's built in generator, I decided to setup validators to use with the dtos. 

Then came creating the gaurd to protect the routes that modify birdhouses. While basic at first, just checking for the prescence of the X-UBID header on a request, it would later get upgraded to check if it was valid uuid using regex, if it belonged to any birdhouse and if it belonged to the birdhouse it was trying to alter specifically.

At this point I had a good number of endpoints so I decided to invest in swagger. I stuck to the default provided ones but the controllers with the X-UBID needed something custom, so I extracted the ApiHeader I had into its own decorator.

There was a slight detour since I'd kept thinking of UBID's as something birdhouse devices possessed intrinsically (like a MAC address for a laptop or a phone), but that didn't align with how the endpoints were described so I scrapped that. 

Once all the main birdhouse endpoints were setup I decided to setup logging with morgan (for http requests) and winston/nest-winston. It's always a tradeoff between should I do this myself or use a library, and the second one won here since there was no real reason for me to setup my own http logging middleware when I could just just ```app.use(morgan('tiny'));```. The scheduling was done using nestjs/schedule and give its own tasks module.

After that I finished the residency endpoints (and while I did consider moving them out to their module, architecturally it was part of the same family as bird so I extracted into separate controllers/services but they all belong to the birdhouse module ) and it was time to integrate and clean up.


