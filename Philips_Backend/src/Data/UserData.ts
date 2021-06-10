import "reflect-metadata";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const AddUserToDatabase = async (user: User) => {
    const userRepo = getRepository(User);
    await userRepo.save(user).catch((err) => {
        console.log(err);
    });
}