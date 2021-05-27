import {Entity, Column} from "typeorm";
import { User } from "./User";

@Entity()
export class Patiënt extends User {

    @Column()
    DoctorId: number;
}