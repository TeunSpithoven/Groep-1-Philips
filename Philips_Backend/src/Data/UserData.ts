import "reflect-metadata";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const AddUserToDatabase = async (user: User) => {
    const userRepo = getRepository(User);
    await userRepo.save(user).catch((err) => {
        console.log(err);
    });
    console.log("User added with id = " + user.Id);
}

// export const VerifyLogin = async (username: string, password: string): Promise<User[]> => {
//     const userRepo = getRepository(User);
//     let foundUser = userRepo.find({ where: [{ Username: username }] });
//     if (foundUser) {
//         return foundUser;
//     }
//     return null;
// }