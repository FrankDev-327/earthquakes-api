import { Address } from "../../entities/address";
import { IAddressPayload } from "../../interfaces/address.interface";
import { AddressRepository } from "../../repository/addresss.repository";
import { IAddressPaginationPayload } from "../../interfaces/address.pagination.interface";

export default class AddressService {
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

    async getAddressPaginationData(query: IAddressPaginationPayload): Promise<Address[]> {
        return await this.addressRepository.getPaginationData(query);
    }

    async getAddressDetailsById(id: string): Promise<Address> {
        return await this.addressRepository.getDetailsById(id);
    }
}
