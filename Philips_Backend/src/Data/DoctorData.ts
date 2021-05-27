import "reflect-metadata";
import {getRepository} from "typeorm";
import {Doctor} from "../entity/Doctor";
import { Patiënt } from "../entity/Patiënt";
import { CalcModel } from "../Models/CalcModel";
import { DoctorModel } from "../Models/DoctorModel";
import { PatiëntModel } from "../Models/PatiëntModel";

export const AddDoctorToDatabase = async (doctor: Doctor) =>{
    const userRepo = getRepository(Doctor);
    await userRepo.save(doctor).catch((err) => {
        console.log(err);
    });
    console.log("Doctor added with id = " + doctor.Id);
}

// export const GetPatiëntsFromDatabase = async (doctor: DoctorModel): Promise<PatiëntModel[]>=>{
//     const patiëntRepo = getRepository(Patiënt);
//     let foundPatiënts = patiëntRepo.find({ where: { DoctorId: doctor.Id} });
//     let returnList: PatiëntModel[];
//     (await foundPatiënts).forEach(patiënt => {
//         let calcs: CalcModel;

//         returnList.push(new PatiëntModel(patiënt, calcs, doctor));
//     });
//     return returnList;
// }
