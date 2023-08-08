import { Seismic } from "../entities/seismic";
import { IAddressPayload } from "../interfaces/address.interface";
import { GeoLocation } from "../services/geo-location/geo.location";
import {SeismicService} from "../services/seismic-service/seismic.service";
import { AddressService } from "../services/address-service/address.service";
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm"

@EventSubscriber()
export class SeismicSubscriber implements EntitySubscriberInterface<Seismic> {
    private geo: GeoLocation;
    private seismicService: SeismicService;
    private addressService: AddressService;

    constructor() {
        this.geo = new GeoLocation();
        this.seismicService = new SeismicService();
        this.addressService = new AddressService();
    }

    listenTo(): string | Function {
        return Seismic;
    }

    async afterInsert(event: InsertEvent<Seismic>) {
        const model = event.entity;
        const geoPayload = { 
            lat: model.lat, 
            lon: model.lon,
            apiKey: process.env.API_KEY
        }
        
        this.geo.gettingApproxAddress(geoPayload, process.env.GEO_LOCATION_URL)
        .then(async (geoResponse) => {
            const properties = geoResponse.data.features[0].properties;  //TODO it always returns data in 0 position
            const addressPayload = await this.settingAddressProperties(properties);
    
            const addressSaved = await this.addressService.storeAddressData(addressPayload);
            model.address = addressSaved;
            await this.seismicService.updateSeismicData(model); 
        })
        .catch(e => {
            console.log(e);
            process.exit(1);
        });
    }

    private async settingAddressProperties(properties) {
        const result :IAddressPayload = {
            country: properties?.country,
            city: properties?.city,
            district: properties?.district,
            neighbourhood: properties?.neighbourhood,
            street: properties?.street,
            country_code: properties?.country_code
        };

        return result;
    }
}
