import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";
import { HoldToken } from "./HoldToken";

@Entity()
export class Token {
  @OneToOne(() => HoldToken, (holdToken) => holdToken.address)
  @PrimaryColumn()
  address: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  symbol: string;

  @Column()
  holders: number;

  @Column()
  open_timestamp: Date;

  @Column()
  created_timestamp: Date;
}
