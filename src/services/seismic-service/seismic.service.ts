import { Seismic } from "../../entities/seismic";
import { IBetweenDatePayload } from "../../interfaces/between.date";
import { ISeismicPayload } from "../../interfaces/seismic.interface";
import { SeismicRepository } from "../../repository/seismic.repository";
import { IPaginationPayload } from "../../interfaces/pagination.interface";

export class SeismicService {
    private seismicRepository : SeismicRepository;

    constructor() {
        this.seismicRepository = new SeismicRepository();
    }

    async storeSeismicInfo(payload: ISeismicPayload[]) {
        return await this.seismicRepository.storeData(payload);
    }

    async getSeismicDetails(id: string): Promise<Seismic> {
        return await this.seismicRepository.getDetails(id);
    }

    async getSeismicBetweenDates(payload: IBetweenDatePayload): Promise<Seismic[]> {
        return await this.seismicRepository.getBetweenDates(payload);
    }

    async getPaginationEarthquakeData(query: IPaginationPayload): Promise<Seismic[]> {
        return await this.seismicRepository.getPaginationData(query);
    }

    async updateSeismicData(payload: Seismic): Promise<Seismic> {
        return await this.seismicRepository.updateData(payload);
    }
}