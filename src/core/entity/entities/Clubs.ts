import { Column, Entity, OneToMany } from "typeorm";
import { ClubStaffs } from "./ClubStaffs";
import { ClubStudents } from "./ClubStudents";
import { Sessions } from "./Sessions";

@Entity("clubs", { schema: "sportcrm-be" })
export class Clubs {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => ClubStaffs, (clubStaffs) => clubStaffs.club)
  clubStaffs: ClubStaffs[];

  @OneToMany(() => ClubStudents, (clubStudents) => clubStudents.club)
  clubStudents: ClubStudents[];

  @OneToMany(() => Sessions, (sessions) => sessions.club)
  sessions: Sessions[];
}
