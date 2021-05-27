import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export abstract class User {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Username: string;

    @Column()
    Password: string;
}