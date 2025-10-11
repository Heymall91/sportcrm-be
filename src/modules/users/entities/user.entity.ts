import { Entity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum GenderType{
    MALE="male",
    Female="female"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column({
        type: "date"
    })
    birthday: Date;

    @Column({
        type: 'enum',
        enum: GenderType
    })
    gender: GenderType;

    @Column()
    height: number;

    @Column()
    weight: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
