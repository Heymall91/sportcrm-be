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
import { PaymentTargets } from "./PaymentTargets";
import { ClubStudents } from "./ClubStudents";

@Index("clubStudentId", ["clubStudentId"], {})
@Entity("payments", { schema: "sportcrm-be" })
export class Payments {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("char", { name: "clubStudentId", nullable: true, length: 36 })
  clubStudentId: string | null;

  @Column("float", { name: "amount", precision: 12 })
  amount: number;

  @Column("enum", { name: "method", enum: ["cash", "card"] })
  method: "cash" | "card";

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => PaymentTargets, (paymentTargets) => paymentTargets.payment)
  paymentTargets: PaymentTargets[];

  @ManyToOne(() => ClubStudents, (clubStudents) => clubStudents.payments, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "clubStudentId", referencedColumnName: "id" }])
  clubStudent: ClubStudents;
}
