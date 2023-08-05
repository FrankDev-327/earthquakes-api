import "reflect-metadata"
import { DataSource } from "typeorm";
import { Seismic } from "../entities/seismic";

const config = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    ssl: true,
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: process.env.NODE_ENV !== 'prod',
    entities: [Seismic],
})


export default config;