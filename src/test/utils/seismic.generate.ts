import { faker } from '@faker-js/faker';
import { Address } from '../../entities/address';

export function generateSeismicData(override = {}) {
    return {
        type: faker.word.words(),
        geometry: { type: 'Point', coordinates: [faker.number.float({ max: 8 }) , faker.number.float({ max: 8 })] },
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
        ...override
    };
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

export function generateSeismicPayload() {
    return {
        type: faker.word.words(),
        geometry: { type: 'Point', coordinates: [faker.number.float({ max: 8 }) , faker.number.float({ max: 8 })] },
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
    };
}