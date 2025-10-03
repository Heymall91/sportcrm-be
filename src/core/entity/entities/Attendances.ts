import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { SessionInstances } from "./SessionInstances";
import { SessionParticipants } from "./SessionParticipants";

@Index("sessionInstanceId", ["sessionInstanceId"], {})
@Index("sessionStudentId", ["sessionStudentId"], {})
@Entity("attendances", { schema: "sportcrm-be" })
export class Attendances {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("char", { name: "sessionInstanceId", nullable: true, length: 36 })
  sessionInstanceId: string | null;

  @Column("char", { name: "sessionStudentId", nullable: true, length: 36 })
  sessionStudentId: string | null;

  @Column("tinyint", { name: "attended", width: 1 })
  attended: boolean;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(
    () => SessionInstances,
    (sessionInstances) => sessionInstances.attendances,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "sessionInstanceId", referencedColumnName: "id" }])
  sessionInstance: SessionInstances;

  @ManyToOne(
    () => SessionParticipants,
    (sessionParticipants) => sessionParticipants.attendances,
    { onDelete: "SET NULL", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "sessionStudentId", referencedColumnName: "id" }])
  sessionStudent: SessionParticipants;
}
