import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ClubStaffs } from "./ClubStaffs";
import { ClubStudents } from "./ClubStudents";
import { Sessions } from "./Sessions";

@Entity("clubs", { schema: "sportcrm-be" })
export class Clubs {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @CreateDateColumn()
    createdAt: Date;
    
  @UpdateDateColumn()
    updatedAt: Date;
    
  @DeleteDateColumn()
    deletedAt: Date | null;

  @OneToMany(() => ClubStaffs, (clubStaffs) => clubStaffs.club)
  clubStaffs: ClubStaffs[];

  @OneToMany(() => ClubStudents, (clubStudents) => clubStudents.club)
  clubStudents: ClubStudents[];

  @OneToMany(() => Sessions, (sessions) => sessions.club)
  sessions: Sessions[];
}
