import { AxiosService } from '../axios-services/axios.service';

export class GeoLocation {      
    async gettingApproxAddress(queryString, url): Promise<any> {
        return await AxiosService.fetchDataForCronJob(queryString, url);
    }       
}