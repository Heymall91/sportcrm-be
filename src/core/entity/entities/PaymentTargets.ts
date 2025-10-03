import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Payments } from "./Payments";
import { Sessions } from "./Sessions";

@Index("paymentId", ["paymentId"], {})
@Index("sessionId", ["sessionId"], {})
@Entity("payment_targets", { schema: "sportcrm-be" })
export class PaymentTargets {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("char", { name: "paymentId", nullable: true, length: 36 })
  paymentId: string | null;

  @Column("char", { name: "sessionId", nullable: true, length: 36 })
  sessionId: string | null;

  @Column("datetime", { name: "month", nullable: true })
  month: Date | null;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Payments, (payments) => payments.paymentTargets, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payments;

  @ManyToOne(() => Sessions, (sessions) => sessions.paymentTargets, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sessionId", referencedColumnName: "id" }])
  session: Sessions;
}
