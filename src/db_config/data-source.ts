import "reflect-metadata";
import { DataSource } from "typeorm";
import { Address } from "../entities/address";
import { Seismic } from "../entities/seismic";
import { SeismicSubscriber } from "../subscribers/SeismicSubscriber";

const config = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    ssl: true,
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: false,
    entities: [Seismic, Address],
    subscribers:[SeismicSubscriber],
});

export default config;
