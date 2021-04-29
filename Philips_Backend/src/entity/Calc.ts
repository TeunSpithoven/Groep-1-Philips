import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Calc {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weight: number;

    @Column()
    carbsOfMeal: number;

    @Column()
    date: number;

}