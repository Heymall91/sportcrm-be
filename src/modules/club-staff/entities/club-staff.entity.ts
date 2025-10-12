import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn, JoinColumn, Entity } from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Club } from "src/modules/clubs/entities/club.entity";

export enum StatusStaff{
    ACTIVE='active',
    INACTIVE='inactive'
}

@Entity()
export class ClubStaff {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Club, club => club.clubStaff)
    @JoinColumn({
        name: 'clubId'
    })
    club: Club;

    @ManyToOne(() => User, user => user.clubStaff)
    @JoinColumn({
        name: 'userId'
    })
    user: User;

    @Column({
        type: 'enum',
        enum: StatusStaff
    })
    status: StatusStaff;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
