import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Payments } from "./Payments";
import { Sessions } from "./Sessions";

@Index("paymentId", ["paymentId"], {})
@Index("sessionId", ["sessionId"], {})
@Entity("payment_targets", { schema: "sportcrm-be" })
export class PaymentTargets {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "paymentId", nullable: true, length: 36 })
  paymentId: string | null;

  @Column("char", { name: "sessionId", nullable: true, length: 36 })
  sessionId: string | null;

  @Column("datetime", { name: "month", nullable: true })
  month: Date | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
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
