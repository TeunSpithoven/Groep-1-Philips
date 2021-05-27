import { AddUserToDatabase } from "../Data/UserData";
import {UserModel} from "../Models/UserModel"

export class UserModelMan{
    Create(id: number, username: string, password: string){
        let user = new UserModel(id, username, password);
        AddUserToDatabase(user);
    }
}