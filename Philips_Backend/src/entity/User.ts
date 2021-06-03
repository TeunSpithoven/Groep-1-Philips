import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    Role: number;

    @Column()
    DoctorId: number;

    @Column()
    Username: string;

    @Column()
    Password: string;
}