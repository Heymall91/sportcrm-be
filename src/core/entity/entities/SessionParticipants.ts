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
import { Sessions } from "./Sessions";
import { ClubStudents } from "./ClubStudents";

@Index("sessionId", ["sessionId"], {})
@Index("clubStudentId", ["clubStudentId"], {})
@Entity("session_participants", { schema: "sportcrm-be" })
export class SessionParticipants {
 @PrimaryGeneratedColumn("uuid") id: string;

  @Column("char", { name: "sessionId", nullable: true, length: 36 })
  sessionId: string | null;

  @Column("char", { name: "clubStudentId", nullable: true, length: 36 })
  clubStudentId: string | null;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

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
