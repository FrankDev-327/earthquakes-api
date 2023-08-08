import {
    generateSeismicData, 
    generateDateRange, 
    generatePagination, 
    generateSeismicDataPayload, 
    generateCountry, 
    generateSeismicPayload, 
    generateSeismicsData, 
    generateSeismicRangeData
} from '../../test/utils/seismic.generate';
import {SeismicService } from './seismic.service';

afterEach(() => {
    jest.resetAllMocks();
});

describe('Seismic service', () => {
    describe('get all by range', () => {
        let seismicService:SeismicService;
        beforeAll(() => {
            seismicService = new SeismicService();
        });
      
        test('should return an empty array', async () => {
            const payload = generateSeismicRangeData();    
            const spy = jest.spyOn(seismicService, 'getSeismicByRangeData').mockResolvedValueOnce([]);
            const seismic = await seismicService.getSeismicByRangeData(payload);
            expect(seismic).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return seismic list', async () => {
            const seismicData = generateSeismicsData();
            const country = generateCountry();
            const spy = jest.spyOn(seismicService, 'getSeismicByCountryData').mockResolvedValueOnce(seismicData);
            const seismic = await seismicService.getSeismicByCountryData(country);
            expect(seismic).toEqual(seismicData);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        describe('create seismic', () => {
            test('should add seismic into the database', async () => {
                const payload = generateSeismicPayload();
                const seicmisData = generateSeismicDataPayload(payload);
                const spy = jest.spyOn(seismicService, 'storeSeismicInfo').mockResolvedValueOnce(seicmisData);
                const seismic = await seismicService.storeSeismicInfo(payload);
                expect(seismic).toEqual(seicmisData);
                expect(spy).toHaveBeenCalledWith(payload);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });

        describe('get a seismic', () => {
            test('should return seismic', async () => {
                const id = "1";
                const seismicData = generateSeismicData({id});
                const spy = jest.spyOn(seismicService, 'getSeismicDetails').mockResolvedValueOnce(seismicData);
                const seismic = await seismicService.getSeismicDetails(id);
                expect(seismic).toEqual(seismicData);
                expect(seismic.id).toBe(id);
                expect(spy).toHaveBeenCalledWith(id);
                expect(spy).toHaveBeenCalledTimes(1);
            }); 
        });

        describe('get seismic between dates', () => {
            test('should return seismic list by dates', async () => {
                const rangeDates = generateDateRange();
                const seismicData = generateSeismicsData();
                const spy = jest.spyOn(seismicService, 'getSeismicBetweenDates').mockResolvedValueOnce(seismicData);
                const seismic = await seismicService.getSeismicBetweenDates(rangeDates);
                expect(seismic).toEqual(seismicData);
                expect(spy).toHaveBeenCalledTimes(1);
            })
        });

        describe('pagination seismic', () => {
            test('should list seismic paginated', async () => {
                const seismicData = generateSeismicsData();
                const pagination = generatePagination();
                const spy = jest.spyOn(seismicService, 'getPaginationEarthquakeData').mockResolvedValueOnce(seismicData);
                const seismics = await seismicService.getPaginationEarthquakeData(pagination);
                expect(seismics).toEqual(seismicData);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });
    });
});