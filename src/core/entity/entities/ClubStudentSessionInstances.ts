import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ClubStudents } from "./ClubStudents";
import { SessionInstances } from "./SessionInstances";

@Index("clubStudentId", ["clubStudentId"], {})
@Index("sessionInstanceId", ["sessionInstanceId"], {})
@Entity("club_student_session_instances", { schema: "sportcrm-be" })
export class ClubStudentSessionInstances {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column("char", { name: "clubStudentId", nullable: true, length: 36 })
  clubStudentId: string | null;

  @Column("char", { name: "sessionInstanceId", nullable: true, length: 36 })
  sessionInstanceId: string | null;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(
    () => ClubStudents,
    (clubStudents) => clubStudents.clubStudentSessionInstances,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "clubStudentId", referencedColumnName: "id" }])
  clubStudent: ClubStudents;

  @ManyToOne(
    () => SessionInstances,
    (sessionInstances) => sessionInstances.clubStudentSessionInstances,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "sessionInstanceId", referencedColumnName: "id" }])
  sessionInstance: SessionInstances;
}
