import { faker } from '@faker-js/faker';
import { Seismic } from '../../entities/seismic';

export function generateAddressData(override = {}) {
  const now = new Date();
    return {
        id: faker.number.int(10),
        createdDate: now,
        updatedDated: now,
        country: faker.location.country(),
        city: faker.location.city(),
        district: faker.location.county(),
        neighbourhood: faker.location.ordinalDirection(),
        street: faker.location.street(),
        country_code: faker.location.countryCode(),
        seismic: new Seismic(),
        ...override
    }
}

export function generateAddressAddData(override = {}) {
  const now = new Date();
    return {
        id: faker.number.int(10),
        createdDate: now,
        updatedDated: now,
        country: faker.location.country(),
        city: faker.location.city(),
        district: faker.location.county(),
        neighbourhood: faker.location.ordinalDirection(),
        street: faker.location.street(),
        country_code: faker.location.countryCode(),
        seismic: new Seismic(),
        ...override
    }
}

export function generateAddressesData(n: string = "1", overide = {}) {
    return Array.from({
      length: parseInt(n),
    }, (_, i) => {
      return generateAddressData(overide);
    });
}

export function generateAddressPayload() {
    return {
        country: faker.location.country(),
        city: faker.location.city(),
        district: faker.location.county(),
        neighbourhood: faker.location.ordinalDirection(),
        street: faker.location.street(),
        country_code: faker.location.countryCode()
    }
  }