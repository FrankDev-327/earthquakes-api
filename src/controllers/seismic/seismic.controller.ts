import { Seismic } from "../../entities/seismic";
import { Get, Route, Tags, Query, Path} from "tsoa";
import { IRangePayload } from "../../interfaces/range.interface";
import { IBetweenDatePayload } from "../../interfaces/between.date";
import { RedisService } from "../../services/redis-service/redis.service";
import { IPaginationPayload } from "../../interfaces/pagination.interface";
import { SeismicService } from "../../services/seismic-service/seismic.service";

@Route("earthquake")
@Tags("Earthquake")
export class SeismicController {
    private redisService : RedisService;
    private seismicService : SeismicService;

    constructor() {
        this.redisService = new RedisService();
        this.seismicService = new SeismicService();
    }

    @Get("/")
    async getPaginationEarthquakeData(@Query() payload: IPaginationPayload): Promise<Seismic[]> {
        let data;
        const expKey = await this.redisService.checkExpRedisKey('seismic_info');

        if(expKey <= 0) {
            data = await this.seismicService.getPaginationEarthquakeData(payload);
            await this.redisService.setObjectKey('seismic_info', data);
        } else {
            data = await this.redisService.getRedis('seismic_info');
        }

        return data;
    }

    @Get('/:id')
    async getSeismicDetails(@Path() id: string): Promise<Seismic> {
        return await this.seismicService.getSeismicDetails(id);
    }

    @Get("/search/:startDate/:endDate")
    async getSeismicBetweenDates(@Path() payload: IBetweenDatePayload): Promise<Seismic[]> {
        let data;
        const expKey = await this.redisService.checkExpRedisKey('seismic_date');
        
        if(expKey <= 0) {
            data = await this.seismicService.getSeismicBetweenDates(payload);
            await this.redisService.setObjectKey('seismic_date', data);
        } else {
            data = await this.redisService.getRedis('seismic_date');
        }

        return data;
    }

    @Get("/place/:country")
    async getSeismicByCountryData(@Path() country: string): Promise<Seismic[]> {
        return await this.seismicService.getSeismicByCountryData(country);
    }

    @Get("/country-range/:place/:extent")
    async getSeismicByRangeData(@Path() payload: IRangePayload): Promise<Seismic[]> {
        return await this.seismicService.getSeismicByRangeData(payload);
    }
}