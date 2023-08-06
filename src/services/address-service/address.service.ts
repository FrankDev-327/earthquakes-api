import { Address } from "../../entities/address";
import { IAddressPayload } from "../../interfaces/address.interface";
import { AddressRepository } from "../../repository/addresss.repository";


export class AddressService {
    private addressRepository: AddressRepository;
    
    constructor() {
        this.addressRepository = new AddressRepository();
    }

    async storeAddressData(payload: IAddressPayload): Promise<Address> {
        return await this.addressRepository.storeData(payload);
    }

    async getListAddresses(): Promise<Address[]> {
        return await this.addressRepository.getList();
    }
}