import addressService from '../../services/address-service/address.service';
import { generateAddressesData, generateAddressPayload, generateAddressData, generateAddressAddData } from '../../test/utils/address.generate';

afterEach(() => {
    jest.resetAllMocks();
});

describe('Address Controller', () => {
    describe('get all addresses', () => {
        test('should return an empty array', async () => {
            const spy = jest.spyOn(addressService, 'getListAddresses').mockResolvedValueOnce([]);
            const addresses = await addressService.getListAddresses();       
            expect(addresses).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should return addresses list', async () => {
            const addressData = generateAddressesData();
            const spy = jest.spyOn(addressService, 'getListAddresses').mockResolvedValueOnce(addressData);
            const addresses = await addressService.getListAddresses(); 
            expect(addresses).toEqual(addressData);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        });

        describe('create Address', () => {
            test('should add an address into the database', async () => {
                const payload = generateAddressPayload();
                const addressData = generateAddressAddData(payload);
                const spy = jest.spyOn(addressService, 'storeAddressData').mockResolvedValueOnce(addressData);
                const address = await addressService.storeAddressData(payload);
                expect(address).toEqual(addressData);
                expect(spy).toHaveBeenCalledWith(payload);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });

        describe('get address', () => {
            test('should return address from the database', async () => {
                const id = "1";
                const addressData = generateAddressAddData({id});
                const spy = jest.spyOn(addressService, 'getAddressDetailsById').mockResolvedValueOnce(addressData);
                const address = await addressService.getAddressDetailsById(id);
                expect(address).toEqual(addressData);
                expect(address.id).toBe(id);
                expect(spy).toHaveBeenCalledWith(id);
                expect(spy).toHaveBeenCalledTimes(1);
            });

            test('should return null if address not found', async () => {
                const id = "1";
                const spy = jest.spyOn(addressService, 'getAddressDetailsById').mockResolvedValueOnce(null);
                const address = await addressService.getAddressDetailsById(id);
                expect(address).toBeNull();
                expect(spy).toHaveBeenCalledWith(id);
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });
    });
});