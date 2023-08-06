import { Seismic } from "../entities/seismic";
import { InitAppSource } from "../db_init/db.init";
import { Between, Like, In } from "typeorm";
import { IBetweenDatePayload } from "../interfaces/between.date";
import { ISeismicPayload } from "../interfaces/seismic.interface";
import { IPaginationPayload } from "../interfaces/pagination.interface";

export class SeismicRepository {
    private seismicRepository;
    constructor() {
        this.seismicRepository = InitAppSource.getRepositoryEntityInstance(Seismic);
    }

    async storeData(payload: ISeismicPayload[]): Promise<Seismic[]> {
        const seismicCreated = this.seismicRepository.create(payload);
        return await this.seismicRepository.save(seismicCreated);
/*         const uniquePayload = this.reducingPayload(payload);
        const seismicInserted = await this.seismicRepository.upsert(payload,
            {
                conflictPaths: ["time", "lastupdate",],
                skipUpdateIfNoValuesChanged: true,
                upsertType: "on-conflict-do-update",
            });
        return seismicInserted; */
    }

    async getDetails(id: string): Promise<Seismic> {
        return await this.seismicRepository.findBy({id});
    }

    async updateData(seismic: Seismic): Promise<Seismic> {
        return await this.seismicRepository.update(seismic.id, { ...seismic });
    }


    async getPaginationData(query: IPaginationPayload): Promise<Seismic[]> {
        return await this.seismicRepository.findAndCount({
            order: {
                id: 'ASC'
            },
            relations:['address'],
            skip: query.skip,
            take: query.take
        });
    }

    async getBetweenDates(query: IBetweenDatePayload): Promise<Seismic[]> {
        return await this.seismicRepository.find({
            where: {
                time: Between(
                    query.startDate,
                    query.endDate
                )
            },
            relations:['address']
        });
    }

    private async reducingPayload(payload) {
        const uniqueData = payload.reduce((acc: ISeismicPayload[], current: ISeismicPayload) => {
            const existingRow = acc.find((item) => item.lastupdate === current.lastupdate && item.time === current.time);
            if (!existingRow) {
              acc.push(current);
            }
            return acc;
          }, []);
        console.log(uniqueData);
        
        return uniqueData;
    }
}