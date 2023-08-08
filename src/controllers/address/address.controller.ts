import { Address } from "../../entities/address";
import { Get, Route, Tags, Path, Query} from "tsoa";
import { RedisService } from "../../services/redis-service/redis.service";
import AddressService from "../../services/address-service/address.service";
import { IAddressPaginationPayload } from "../../interfaces/address.pagination.interface";

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

    @Get("/paginate")
    async getAddressPaginationData(@Query() payload: IAddressPaginationPayload): Promise<Address[]> {
        let data;
        const expKey = await this.redisService.checkExpRedisKey('address_pag');
        if(expKey <= 0) {
            data = await this.addressService.getAddressPaginationData(payload);
            await this.redisService.setObjectKey('address_pag', data);
        } else {
            data = await this.redisService.getRedis('address_pag');
        }

        return data;
    }

    @Get("/:id")
    async getAddressDetailsById(@Path() id: string): Promise<Address> {
        return await this.addressService.getAddressDetailsById(id);
    }
}