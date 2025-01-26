import { Entity, Column, PrimaryColumn } from "typeorm";


@Entity()
export class NewCreationToken {

  @PrimaryColumn()
  address: string;

  @Column({default: ''})
  name?: string;

  @Column({default: ''})
  symbol?: string;

  @Column({default: ''})
  logo?: string;

  @Column({default: ''})
  website?: string;

  @Column({default: ''})
  twitter?: string;

  @Column({default: ''})
  telegram?: string;

  @Column({default: 0})
  price?: number;

  @Column({default: 0})
  holder_count?: number;

  @Column({default: ''})
  creator?: string;

  @Column({default: ''})
  creator_balance?: string;

  @Column({default: ''})
  creator_token_balance?: string;

  @Column("timestamp")
  created_timestamp: Date;

}
