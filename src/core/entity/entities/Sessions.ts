import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ClubStudentSessions } from "./ClubStudentSessions";
import { PaymentTargets } from "./PaymentTargets";
import { SessionParticipants } from "./SessionParticipants";
import { SessionSchedules } from "./SessionSchedules";
import { Clubs } from "./Clubs";

@Index("clubId", ["clubId"], {})
@Entity("sessions", { schema: "sportcrm-be" })
export class Sessions {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "clubId", nullable: true, length: 36 })
  clubId: string | null;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "defaultDurationInMinutes", default: () => "'30'" })
  defaultDurationInMinutes: number;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(
    () => ClubStudentSessions,
    (clubStudentSessions) => clubStudentSessions.session
  )
  clubStudentSessions: ClubStudentSessions[];

  @OneToMany(() => PaymentTargets, (paymentTargets) => paymentTargets.session)
  paymentTargets: PaymentTargets[];

  @OneToMany(
    () => SessionParticipants,
    (sessionParticipants) => sessionParticipants.session
  )
  sessionParticipants: SessionParticipants[];

  @OneToMany(
    () => SessionSchedules,
    (sessionSchedules) => sessionSchedules.session
  )
  sessionSchedules: SessionSchedules[];

  @ManyToOne(() => Clubs, (clubs) => clubs.sessions, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "clubId", referencedColumnName: "id" }])
  club: Clubs;
}
