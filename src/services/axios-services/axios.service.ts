import axios from 'axios';

export class AxiosService {
    static async fetchDataForCronJob(queryString) {
        return await axios.get(process.env.FDSN_URL, {
            params: queryString
        });
    }
}