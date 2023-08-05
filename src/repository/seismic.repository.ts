import { Seismic } from "../entities/seismic";
import { InitAppSource } from "../db_init/db.init";
import { ISeismicPayload } from "../interfaces/seismic.interface";


export class SeismicRepository {
    private seismicRepository;
    constructor() {
        this.seismicRepository = InitAppSource.getRepositoryEntityInstance(Seismic);
    }
    
    async storeData(payload: ISeismicPayload[]) {
        const seismicInserted = await this.seismicRepository.save(payload);
        return seismicInserted;
    }
}