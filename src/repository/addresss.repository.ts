import { Address } from "../entities/address";
import { InitAppSource } from "../db_init/db.init";
import { IAddressPayload } from "../interfaces/address.interface";


export class AddressRepository {
    private addressRepository;

    constructor() {
        this.addressRepository = InitAppSource.getRepositoryEntityInstance(Address);
    }

    async storeData(payload: IAddressPayload): Promise<Address> {
        const addressCreated = this.addressRepository.create(payload);
        return await this.addressRepository.save(addressCreated);
    }

    async getList(): Promise<Address[]> {
        return await this.addressRepository.find();
    }
}