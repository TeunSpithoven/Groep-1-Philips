import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Calc {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    UserId: string;

    @Column()
    Weight: number;

    @Column()
    CarbsOfMeal: number;

    @Column()
    InsulineDose: number;

    @CreateDateColumn()
    date: Date;
    
}