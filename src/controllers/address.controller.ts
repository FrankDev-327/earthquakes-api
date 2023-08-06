import { Address } from "../entities/address";
import { Get, Route, Tags, Path} from "tsoa";
import { RedisService } from "../services/redis-service/redis.service";
import { AddressService } from "../services/address-service/address.service";

@Route("address")
@Tags("Address")
export class AddressController {
    private redisService : RedisService;
    private addressService : AddressService;

    constructor() {
        this.redisService = new RedisService();
        this.addressService = new AddressService();
    }

    @Get("/")
    async getListAddresses(): Promise<Address[]> {
        let data;
        const expKey = await this.redisService.checkExpRedisKey('address_info');
        if(expKey <= 0) {
            data = await this.addressService.getListAddresses();
            await this.redisService.setObjectKey('address_info', data);
        } else {
            data = await this.redisService.getRedis('address_info');
        }
        
        return data;
    }
}