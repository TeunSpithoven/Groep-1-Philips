import {PatiëntModel} from "./PatiëntModel";
import { UserModel } from "./UserModel";

export class DoctorModel extends UserModel {
    Patiënts: PatiëntModel
  }