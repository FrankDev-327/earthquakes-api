import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseModelEntity } from "./base.model.entity";
import { Seismic } from "./seismic";

@Entity('address')
export class Address extends BaseModelEntity {
    @Column({
        nullable: true
    })
    country: string;

    @Column({
        nullable: true
    })
    city: string;
    
    @Column({
        nullable: true
    })
    district: string;

    @Column({
        nullable: true
    })
    neighbourhood: string;

    @Column({
        nullable: true
    })
    street: string;

    @Column({
        nullable: true
    })
    country_code: string;

    @OneToOne(() => Seismic, (seismic) => seismic.address)
    @JoinColumn()
    seismic: Seismic;
}
