require('dotenv').config();
import Router from './routes';
import Logger from './lib/logger';
import * as express from 'express';
import specs from './swagger/swaggerDoc';
import responseLogger from './lib/responLogger';
import * as swaggerUi from "swagger-ui-express";
import { InitAppSource } from './db_init/db.init';
import morganMiddleware from './config/morganMiddleware';
import { Application, Request, Response } from "express";
import { CronJob } from './services/cron-job-service/cron.job.service';

const job = new CronJob();
const PORT = process.env.PORT_SERVER || 8000;

const app: Application = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(morganMiddleware);
app.use(responseLogger);
app.use(Router);

app.get( "/test", (req: Request, res: Response ) => {
    res.send( "Hello world!" );
});

InitAppSource.databaseInit()
    .then(() => {
        app.listen(PORT, async () => {
            Logger.info(`Server is up and running @ http://localhost:${PORT}`);
            const query = {
                catalog: "EMSC-EMB",
                limit: "5",
                format: "json"
            }
            
            //job.scheduling(query, process.env.FDSN_URL);
        });
        
    })
    .catch(err => {
        Logger.error("Unable to connect to db", err);
        process.exit(1);
    });