# Seismic

Welcome to the project! This document will guide you through the initial setup and usage of the project.

# Installation
Install the dependencies: `pnpm install` (if you have it installed), or `npm install`

## Configuration
Before running the project, you need to set up some configuration values.
Create a `.env` file in the root directory of the project and copy the content from `.env.example` into it.

```bash
PORT=8000
NODE_ENV=dev
API_KEY="b772491578dc4b11b43dc427e4e2d693"
FDSN_URL="https://seismicportal.eu/fdsnws/event/1/query?"
GEO_LOCATION_URL="https://api.geoapify.com/v1/geocode/reverse?"
REDIS_URL='redis://default:8fb4fdacbf0c4c729765874a8222d2d3@flowing-tarpon-35172.upstash.io:35172'
DB_URL="postgres://renteriafrancisco51:hDg6JCLd1Yqk@ep-falling-shape-790103.us-east-2.aws.neon.tech/earthquakes"
```

# Running the API 
Open your terminal.
Navigate to the project directory.
Run pnpm run start:dev or npm run start:dev
Access the API documentation at http://localhost:8000/docs/.

# Running Unit Tests 
Open your terminal.
Navigate to your project directory.
Execute pnpm run test:unit.

Note: if you want to display more information about the test, just add at the end this flag `--coverage`