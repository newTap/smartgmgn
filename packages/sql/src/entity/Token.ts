import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Token {

    @PrimaryColumn()
    address: number

    @Column()
    name: string

    @Column()
    price: string

    @Column()
    symbol: string

    @Column()
    open_timestamp: number
    
    @Column()
    created_timestamp: number
}
