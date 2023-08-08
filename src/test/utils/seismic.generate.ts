import { faker } from '@faker-js/faker';
import { Point } from 'typeorm';
import { Address } from '../../entities/address';

export function generateSeismicData(override = {}) {
    const now = new Date();
    return {
        id: faker.number.int(10),
        type: faker.word.words(),
        geometry: generateFakePoint(),
        lastupdate: faker.date.recent().toISOString(),
        magtype: faker.word.words() ,
        evtype: faker.word.words() ,
        createdDate: now,
        updatedDated: now,
        lon: parseFloat(faker.finance.amount(-180, 180, 5)),
        address: new Address(),
        auth: faker.person.firstName(),
        source_id: faker.string.uuid(),
        depth: parseFloat(faker.finance.amount(0, 100, 2)),
        unid: faker.string.uuid(),
        mag: parseFloat(faker.finance.amount(0, 10, 2)),
        time: faker.date.recent().toISOString(),
        lat: parseFloat(faker.finance.amount(-90, 90, 5)),
        source_catalog: faker.word.words() ,
        flynn_region: faker.word.words() ,
        id_feature: faker.string.uuid(),
        ...override
    };
}

export function generateSeismicDataPayload(override = {}) {
    const now = new Date();
    return [{
        id: faker.number.int(10),
        type: faker.word.words(),
        geometry: generateFakePoint(),
        lastupdate: faker.date.recent().toISOString(),
        magtype: faker.word.words() ,
        evtype: faker.word.words() ,
        createdDate: now,
        updatedDated: now,
        lon: parseFloat(faker.finance.amount(-180, 180, 5)),
        address: new Address(),
        auth: faker.person.firstName(),
        source_id: faker.string.uuid(),
        depth: parseFloat(faker.finance.amount(0, 100, 2)),
        unid: faker.string.uuid(),
        mag: parseFloat(faker.finance.amount(0, 10, 2)),
        time: faker.date.recent().toISOString(),
        lat: parseFloat(faker.finance.amount(-90, 90, 5)),
        source_catalog: faker.word.words() ,
        flynn_region: faker.word.words() ,
        id_feature: faker.string.uuid(),
        ...override
    }];
}

export function generateSeismicsData(n: string = "1", overide = {}) {
    return Array.from({
      length: parseInt(n),
    }, (_, i) => {
      return generateSeismicData(overide);
    });
}

export function generateSeismicRangeData() {
    const  options = ['year', 'days', 'month', '24h'];
    return {
        place: faker.location.county(),
        extent: options[Math.floor(Math.random() * options.length)],
    }
}

export function generateCountry() {
    const countries = ['Italy', 'Greece', 'France']
    return countries[Math.floor(Math.random() * countries.length)]
}

export function generatePagination() {
    return {
        skip:faker.number.int(3),
        take: faker.number.int(3),
    }
}

export function generateDateRange() {
    const start = ['2009-09-15', '2010-10-25', '2011-12-31'];
    const end = ['2014-12-31', '2016-03-13', '2018-01-01'];
    return  {
        startDate: start[Math.floor(Math.random() * start.length)],
        endDate: end[Math.floor(Math.random() * end.length)],
    }
}

export function generateSeismicPayload() {
    return [{
        type: faker.word.words(),
        geometry: generateFakePoint(),
        lastupdate: faker.date.recent().toISOString(),
        magtype: faker.word.words() ,
        evtype: faker.word.words() ,
        lon: parseFloat(faker.finance.amount(-180, 180, 5)),
        address: new Address(),
        auth: faker.person.firstName(),
        source_id: faker.string.uuid(),
        depth: parseFloat(faker.finance.amount(0, 100, 2)),
        unid: faker.string.uuid(),
        mag: parseFloat(faker.finance.amount(0, 10, 2)),
        time: faker.date.recent().toISOString(),
        lat: parseFloat(faker.finance.amount(-90, 90, 5)),
        source_catalog: faker.word.words() ,
        flynn_region: faker.word.words() ,
        id_feature: faker.string.uuid(),
    }]
}

function generateFakePoint(): Point {
    return {
        type: "Point",
        coordinates: [faker.number.float({ max: 8 }), faker.number.float({ max: 8 })]
    };
}