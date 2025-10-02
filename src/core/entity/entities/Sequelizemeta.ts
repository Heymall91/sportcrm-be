import { Column, Entity, Index } from "typeorm";

@Index("name", ["name"], { unique: true })
@Entity("sequelizemeta", { schema: "sportcrm-be" })
export class Sequelizemeta {
  @Column("varchar", { primary: true, name: "name", length: 255 })
  name: string;
}
