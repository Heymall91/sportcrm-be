import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Attendances } from "./Attendances";
import { ClubStudentSessionInstances } from "./ClubStudentSessionInstances";
import { SessionSchedules } from "./SessionSchedules";

@Index("sessionScheduleId", ["sessionScheduleId"], {})
@Entity("session_instances", { schema: "sportcrm-be" })
export class SessionInstances {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "sessionScheduleId", nullable: true, length: 36 })
  sessionScheduleId: string | null;

  @Column("enum", {
    name: "status",
    enum: ["pending", "completed", "cancelled"],
  })
  status: "pending" | "completed" | "cancelled";

  @Column("int", { name: "durationMinutes" })
  durationMinutes: number;

  @Column("datetime", { name: "datatime" })
  datatime: Date;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(() => Attendances, (attendances) => attendances.sessionInstance)
  attendances: Attendances[];

  @OneToMany(
    () => ClubStudentSessionInstances,
    (clubStudentSessionInstances) => clubStudentSessionInstances.sessionInstance
  )
  clubStudentSessionInstances: ClubStudentSessionInstances[];

  @ManyToOne(
    () => SessionSchedules,
    (sessionSchedules) => sessionSchedules.sessionInstances,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "sessionScheduleId", referencedColumnName: "id" }])
  sessionSchedule: SessionSchedules;
}
