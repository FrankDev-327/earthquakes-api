export interface ISeismicPayload {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    lastupdate: string;
    magtype: string;
    evtype: string;
    lon: number;
    auth: string;
    source_id: string;
    depth: number;
    unid: string;
    mag: number;
    time: string;
    lat: number;
    source_catalog: string;
    flynn_region: string;
    id_feature: string;
  }