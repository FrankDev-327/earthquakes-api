import * as schedule from "node-schedule";
import { AxiosService } from '../axios-services/axios.service';
import SeismicService from "../seismic-service/seismic.service";

export class CronJob {
    private seismicService: SeismicService;
    constructor() {
        this.seismicService = new SeismicService();
    }
    
    async scheduling(queryString, url) {
        const dataToInsert = [];
        const rule = new schedule.RecurrenceRule();
        rule.second = 10,

        schedule.scheduleJob(rule, async () => {        
            const response = await AxiosService.fetchDataForCronJob(queryString, url);
            response.data.features.map( async (item) => {
                dataToInsert.push({
                    type: item.type,
                    geometry : {
                        type: item.geometry.type,
                        coordinates: item.geometry.coordinates
                    },
                    ...item.properties,
                    id_feature: item.id,
                });
            });
            
            this.seismicService.storeSeismicInfo(dataToInsert)
            .then(() => {
                console.log('data was inserted');
            })
            .catch(e => {
                console.log('there is an error');
                console.log(e);
            });
            
        });
    }
}
