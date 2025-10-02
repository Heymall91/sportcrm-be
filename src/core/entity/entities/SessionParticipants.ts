import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Attendances } from "./Attendances";
import { Sessions } from "./Sessions";
import { ClubStudents } from "./ClubStudents";

@Index("sessionId", ["sessionId"], {})
@Index("clubStudentId", ["clubStudentId"], {})
@Entity("session_participants", { schema: "sportcrm-be" })
export class SessionParticipants {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "sessionId", nullable: true, length: 36 })
  sessionId: string | null;

  @Column("char", { name: "clubStudentId", nullable: true, length: 36 })
  clubStudentId: string | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(() => Attendances, (attendances) => attendances.sessionStudent)
  attendances: Attendances[];

  @ManyToOne(() => Sessions, (sessions) => sessions.sessionParticipants, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sessionId", referencedColumnName: "id" }])
  session: Sessions;

  @ManyToOne(
    () => ClubStudents,
    (clubStudents) => clubStudents.sessionParticipants,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "clubStudentId", referencedColumnName: "id" }])
  clubStudent: ClubStudents;
}
