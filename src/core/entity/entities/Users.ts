import { Column, Entity, OneToMany } from "typeorm";
import { ClubStaffs } from "./ClubStaffs";
import { ClubStudents } from "./ClubStudents";

@Entity("users", { schema: "sportcrm-be" })
export class Users {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "firstName", length: 255 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 255 })
  lastName: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("enum", { name: "gender", enum: ["male", "female"] })
  gender: "male" | "female";

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => ClubStaffs, (clubStaffs) => clubStaffs.user)
  clubStaffs: ClubStaffs[];

  @OneToMany(() => ClubStudents, (clubStudents) => clubStudents.user)
  clubStudents: ClubStudents[];
}
