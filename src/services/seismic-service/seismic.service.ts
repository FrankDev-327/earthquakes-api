import { ISeismicPayload } from "../../interfaces/seismic.interface";
import { SeismicRepository } from "../../repository/seismic.repository";


export class SeismicService {
    private seismicRepository : SeismicRepository;

    constructor() {
        this.seismicRepository = new SeismicRepository();
    }

    async storeSeismicInfo(payload: ISeismicPayload[]) {
        return await this.seismicRepository.storeData(payload);
    }
}