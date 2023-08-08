import SeismicService from './seismic.service';
import {generateSeismicData, generateSeismicPayload, generateSeismicsData, generateSeismicRangeData} from '../../test/utils/seismic.generate';

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
    });
});