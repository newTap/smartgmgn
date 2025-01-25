import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { HoldToken } from "./HoldToken";

@Entity()
export class Token {
  @PrimaryColumn()
  address: string;

  @Column()
  pair_id?: string;

  @Column()
  name?: string;

  @Column()
  price?: string;

  @Column()
  symbol?: string;

  @Column()
  holders?: number;

  @Column({
    type: "int",
  })
  timestamp?: number;

  @Column()
  open_timestamp?: Date;

  @Column()
  created_timestamp?: Date;

  @OneToMany(() => HoldToken, holdToken => holdToken.token)
  holdTokens: HoldToken[];
}
