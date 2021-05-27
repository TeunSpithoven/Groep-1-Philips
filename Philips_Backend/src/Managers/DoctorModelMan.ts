import { AddDoctorToDatabase } from "../Data/DoctorData";
import { DoctorModel } from "../Models/DoctorModel";
import { PatiëntModel } from "../Models/PatiëntModel";

export class DoctorModelMan {
  Create(id: number, username: string, password: string){
    let doctor = new DoctorModel(id, username, password);
    AddDoctorToDatabase(doctor);
  }

  GetPatiënts(doctorId: number): PatiëntModel[]{
    let returnList: PatiëntModel[];
    // krijg patiënten uit database
    return returnList;
  }
}
