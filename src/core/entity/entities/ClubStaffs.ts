import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Clubs } from "./Clubs";
import { Users } from "./Users";

@Index("clubId", ["clubId"], {})
@Index("userId", ["userId"], {})
@Entity("club_staffs", { schema: "sportcrm-be" })
export class ClubStaffs {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("char", { name: "clubId", nullable: true, length: 36 })
  clubId: string | null;

  @Column("char", { name: "userId", nullable: true, length: 36 })
  userId: string | null;

  @Column("enum", { name: "status", enum: ["active", "inactive"] })
  status: "active" | "inactive";

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
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
