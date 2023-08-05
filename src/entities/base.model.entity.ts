import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseModelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDated: Date;
}
