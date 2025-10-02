import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ClubStudentSessionInstances } from "./ClubStudentSessionInstances";
import { ClubStudentSessions } from "./ClubStudentSessions";
import { Clubs } from "./Clubs";
import { Users } from "./Users";
import { Payments } from "./Payments";
import { SessionParticipants } from "./SessionParticipants";

@Index("clubId", ["clubId"], {})
@Index("userId", ["userId"], {})
@Entity("club_students", { schema: "sportcrm-be" })
export class ClubStudents {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "clubId", nullable: true, length: 36 })
  clubId: string | null;

  @Column("char", { name: "userId", nullable: true, length: 36 })
  userId: string | null;

  @Column("enum", { name: "status", enum: ["active", "inactive"] })
  status: "active" | "inactive";

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => ClubStudentSessionInstances,
    (clubStudentSessionInstances) => clubStudentSessionInstances.clubStudent
  )
  clubStudentSessionInstances: ClubStudentSessionInstances[];

  @OneToMany(
    () => ClubStudentSessions,
    (clubStudentSessions) => clubStudentSessions.clubStudent
  )
  clubStudentSessions: ClubStudentSessions[];

  @ManyToOne(() => Clubs, (clubs) => clubs.clubStudents, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "clubId", referencedColumnName: "id" }])
  club: Clubs;

  @ManyToOne(() => Users, (users) => users.clubStudents, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Payments, (payments) => payments.clubStudent)
  payments: Payments[];

  @OneToMany(
    () => SessionParticipants,
    (sessionParticipants) => sessionParticipants.clubStudent
  )
  sessionParticipants: SessionParticipants[];
}
