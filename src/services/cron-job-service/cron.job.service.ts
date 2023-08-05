import * as schedule from "node-schedule";
import { SeismicService } from "../seismic-service/seismic.service";
import { AxiosService } from '../axios-services/axios.service';

export class CronJob {
    private seismicService: SeismicService;
    constructor() {
        this.seismicService = new SeismicService();
    }
    
    async scheduling(queryString) {
        const dataToInsert = [];
        const rule = new schedule.RecurrenceRule();
        rule.second = 10,
        
        schedule.scheduleJob(rule, async () => {        
            const response = await AxiosService.fetchDataForCronJob(queryString);
            response.data.features.map( async (item) => {
                dataToInsert.push({
                    type: item.type,
                    geometry : item.geometry,
                    lastupdate: item.properties.lastupdate,
                    magtype: item.properties.magtype,
                    evtype: item.properties.evtype,
                    lon: item.properties.lon,
                    auth: item.properties.auth,
                    source_id: item.properties.source_id,
                    depth: item.properties.depth,
                    unid: item.properties.unid,
                    mag: item.properties.mag,
                    lat: item.properties.lat,
                    source_catalog: item.properties.source_catalog,
                    flynn_region: item.properties.flynn_region,
                    id_feature: item.id,
                });
            });
            const dataStored = await this.seismicService.storeSeismicInfo(dataToInsert);
            console.log(dataStored);
            
        });
    }
}