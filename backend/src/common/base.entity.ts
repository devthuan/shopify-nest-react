import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        default: null
    })
    updatedAt: Date;

    @Column({
        default: null
    })
    @DeleteDateColumn()
    @Exclude()
    deletedAt: Date;
}