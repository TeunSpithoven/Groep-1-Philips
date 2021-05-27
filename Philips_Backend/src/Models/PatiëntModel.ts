import {CalcModel} from "./CalcModel";
import {DoctorModel} from "./DoctorModel";
import { UserModel } from "./UserModel";

export class PatiëntModel extends UserModel {
    Calculations: CalcModel[];
    Doctor: DoctorModel;

    constructor(user: UserModel, calculations: CalcModel[], doctor: DoctorModel){
      super(user.Id, user.Username, user.Password);
      this.Calculations = calculations;
      this.Doctor = doctor;
    }
  }