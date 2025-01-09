import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Token {
  @PrimaryColumn()
  address: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  symbol: string;

  @Column()
  holders: string;

  @Column()
  open_timestamp: Date;

  @Column()
  created_timestamp: Date;
}
