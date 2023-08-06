require('dotenv').config();
import * as express from 'express';
import Router from './routes';
import { InitAppSource } from './db_init/db.init';
import { Application, Request, Response } from "express";
import { CronJob } from './services/cron-job-service/cron.job.service';

const job = new CronJob();
const PORT = process.env.PORT_SERVER || 8000;

const app: Application = express();
app.use(express.json());

app.use(Router);

app.get( "/test", (req: Request, res: Response ) => {
    res.send( "Hello world!" );
});

InitAppSource.databaseInit()
    .then(() => {
        app.listen(PORT, async () => {
            console.log("Server is running on port", PORT);
            const query = {
                catalog: "EMSC-EMB",
                limit: "5",
                format: "json"
            }
            
            //job.scheduling(query, process.env.FDSN_URL);
        });
        
    })
    .catch(err => {
        console.log("Unable to connect to db", err);
        process.exit(1);
    });