import axios from 'axios';

export class AxiosService {
    static async fetchDataForCronJob(queryString, url) {
        return await axios.get(url, {
            params: queryString
        });
    }
}