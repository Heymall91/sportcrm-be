import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SessionInstances } from "./SessionInstances";
import { Sessions } from "./Sessions";

@Index("sessionId", ["sessionId"], {})
@Entity("session_schedules", { schema: "sportcrm-be" })
export class SessionSchedules {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "sessionId", nullable: true, length: 36 })
  sessionId: string | null;

  @Column("enum", { name: "type", enum: ["once", "weekly"] })
  type: "once" | "weekly";

  @Column("int", { name: "durationMinutes" })
  durationMinutes: number;

  @Column("time", { name: "time" })
  time: string;

  @Column("datetime", { name: "onceDate", nullable: true })
  onceDate: Date | null;

  @Column("datetime", { name: "startDate", nullable: true })
  startDate: Date | null;

  @Column("datetime", { name: "endDate", nullable: true })
  endDate: Date | null;

  @Column("varchar", { name: "dayOfWeekMask", nullable: true, length: 255 })
  dayOfWeekMask: string | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(
    () => SessionInstances,
    (sessionInstances) => sessionInstances.sessionSchedule
  )
  sessionInstances: SessionInstances[];

  @ManyToOne(() => Sessions, (sessions) => sessions.sessionSchedules, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sessionId", referencedColumnName: "id" }])
  session: Sessions;
}
