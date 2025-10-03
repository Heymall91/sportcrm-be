import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { Attendances } from "./Attendances";
import { ClubStudentSessionInstances } from "./ClubStudentSessionInstances";
import { SessionSchedules } from "./SessionSchedules";

@Index("sessionScheduleId", ["sessionScheduleId"], {})
@Entity("session_instances", { schema: "sportcrm-be" })
export class SessionInstances {
  @PrimaryGeneratedColumn("uuid") id: string;

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

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

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
