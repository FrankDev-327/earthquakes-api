import { DateRange } from "../utils/helper";
import { Seismic } from  '../entities/seismic';
import config from "../db_config/data-source";
import { Between, MoreThan } from "typeorm";
import { IRangePayload } from "../interfaces/range.interface";
import { getRepositoryEntityInstance } from "../db_init/db.init";
import { IBetweenDatePayload } from "../interfaces/between.date";
import { ISeismicPayload } from "../interfaces/seismic.interface";
import { IPaginationPayload } from "../interfaces/pagination.interface";

export class SeismicRepository {
    private seismicRepository;

    constructor() {
        this.seismicRepository = getRepositoryEntityInstance(Seismic);
    }

    async storeData(payload: ISeismicPayload[]): Promise<Seismic[]> {
        payload.map(async (item) => {
            config.transaction(async transactionalEntityManager => {
           
                const existingRecord = await transactionalEntityManager.findOne(Seismic, {
                    where: {
                        id_feature: item.id_feature,
                        flynn_region: item.flynn_region
                    }
                });

                if(existingRecord) {
                    const data = await this.settingSeismicProperties(item);
                    Object.assign(existingRecord, { ...data });
                    await transactionalEntityManager.save(existingRecord);
                } else {
                    const newRecord = transactionalEntityManager.create(Seismic, item);
                    await transactionalEntityManager.save(newRecord);
                }
            });
        });

        return ;
    }

    async getDetails(id: string): Promise<Seismic> {
        return await this.seismicRepository.findOne({
            where:{id},
            relations:['address']
        });
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

    async getByCountryData(country: string): Promise<Seismic[]> {
        return await this.seismicRepository.find({
            order: {
                id: 'ASC'
            },
            relations: ['address'],
            where:{
                address: {
                    country: country
                }
            }
        });
    }

    async getByRangeData(payload: IRangePayload): Promise<Seismic[]> {
        const statement = DateRange.definingRange(payload.extent);    
        return await this.seismicRepository.find({
            order: {
                id: 'ASC'
            },
            relations: ['address'],
            where:{
                time: MoreThan(statement),
                address: {
                    country: payload.place
                }
            }
        });
    }

    private async settingSeismicProperties(data) {
        return {
            type: data?.type,
            geometry : {
                type: data?.geometry?.type,
                coordinates: data.geometry?.coordinates
            },
            lastupdate: data.properties?.lastupdate,
            address: data.properties?.address,
            auth: data.properties?.auth,
            source_id: data.properties?.source_id,
            depth: data.properties?.depth,
            unid: data.properties?.unid,
            mag: data.properties?.mag,
            time: data.properties?.time,
            source_catalog: data.properties?.source_catalog,
        }
    }

}