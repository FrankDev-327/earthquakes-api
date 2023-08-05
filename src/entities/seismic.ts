import { BeforeInsert, Column, Entity } from "typeorm"
import { BaseModelEntity } from "./base.model.entity";

@Entity('seismic')
export class Seismic extends BaseModelEntity {
    @Column()
    type: string;

    @Column({ type: 'simple-json' })
    geometry: {
      type: string;
      coordinates: number[];
    };
  
    @Column()
    lastupdate: string;
  
    @Column()
    magtype: string;
  
    @Column()
    evtype: string;
  
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    lon: number;

    @Column({
      nullable: true
    })
    approx_address: string;
  
    @Column()
    auth: string;
  
    @Column()
    source_id: string;
  
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    depth: number;
  
    @Column()
    unid: string;
  
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    mag: number;
  
    @Column({
      nullable: true
    })
    time: string;
  
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    lat: number;
  
    @Column()
    source_catalog: string;
  
    @Column()
    flynn_region: string;
  
    @Column()
    id_feature: string;

    @BeforeInsert()
    async gettingNameLocation() {
        
    }
}
