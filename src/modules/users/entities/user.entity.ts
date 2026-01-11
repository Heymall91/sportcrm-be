import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClubStaff } from 'src/modules/club-staff/entities/club-staff.entity';

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  auth0ID: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isRegistrationCompleted: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date;

  @Column({
    type: 'enum',
    enum: GenderType,
    nullable: true,
  })
  gender: GenderType;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ type: 'int', nullable: true })
  weight: number;

  @OneToMany(() => ClubStaff, (clubStaff) => clubStaff.user)
  clubStaff: ClubStaff[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
  
  @Column({ nullable: true })
  createdById: string;

  @OneToMany(() => User, (user) => user.createdBy)
  createdUsers: User[];
}
