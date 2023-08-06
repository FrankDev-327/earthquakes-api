import { Address } from "./address";
import { BaseModelEntity } from "./base.model.entity";
import { Column, Entity, Index, Point, Unique, OneToOne, JoinColumn } from "typeorm";

/* @Unique([
  'lastupdate', 
  'time',
  'type',
  'geometry',
  'magtype',
  'evtype',
  'lon',
  'lat',
  'auth',
  'source_id',
  'depth',
  'unid',
  'mag',
  'source_catalog',
  'flynn_region'
]) */
@Entity('seismic')
export class Seismic extends BaseModelEntity {
    @Column()
    type: string;

    @Column("geometry",)
    geometry: Point;

    @Column()
    lastupdate: string;
  
    @Column()
    magtype: string;
  
    @Column()
    evtype: string;
  
    @Index('idx_name_lon')
    @Column({type: "decimal", precision: 10, scale: 5, default: 0})
    lon: number;

    @OneToOne(() => Address, {
      createForeignKeyConstraints: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'address_id'})
    address: Address;
  
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
  
    @Column()
    time: string;
  
    @Index('idx_name_lan')
    @Column({type: "decimal", precision: 10, scale: 5, default: 0})
    lat: number;
  
    @Column()
    source_catalog: string;
  
    @Column()
    flynn_region: string;
  
    @Index('idx_name_id_features')
    @Column()
    id_feature: string;
}
