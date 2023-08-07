import "reflect-metadata"
import { DataSource } from "typeorm";
import { Address } from "../entities/address";
import { Seismic } from "../entities/seismic";
import { AddressSubscriber } from "../subscribers/AddressSubscriber";

const config = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    ssl: true,
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: true,
    entities: [Seismic, Address],
    subscribers:[AddressSubscriber],
});

export default config;
