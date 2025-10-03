import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ClubStudents } from "./ClubStudents";
import { Sessions } from "./Sessions";

@Index("clubStudentId", ["clubStudentId"], {})
@Index("sessionId", ["sessionId"], {})
@Entity("club_student_sessions", { schema: "sportcrm-be" })
export class ClubStudentSessions {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("char", { name: "clubStudentId", nullable: true, length: 36 })
  clubStudentId: string | null;

  @Column("char", { name: "sessionId", nullable: true, length: 36 })
  sessionId: string | null;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(
    () => ClubStudents,
    (clubStudents) => clubStudents.clubStudentSessions,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "clubStudentId", referencedColumnName: "id" }])
  clubStudent: ClubStudents;

  @ManyToOne(() => Sessions, (sessions) => sessions.clubStudentSessions, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sessionId", referencedColumnName: "id" }])
  session: Sessions;
}
