import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Clubs } from "./Clubs";
import { Users } from "./Users";

@Index("clubId", ["clubId"], {})
@Index("userId", ["userId"], {})
@Entity("club_staffs", { schema: "sportcrm-be" })
export class ClubStaffs {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("char", { name: "clubId", nullable: true, length: 36 })
  clubId: string | null;

  @Column("char", { name: "userId", nullable: true, length: 36 })
  userId: string | null;

  @Column("enum", { name: "status", enum: ["active", "inactive"] })
  status: "active" | "inactive";

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Clubs, (clubs) => clubs.clubStaffs, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "clubId", referencedColumnName: "id" }])
  club: Clubs;

  @ManyToOne(() => Users, (users) => users.clubStaffs, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
