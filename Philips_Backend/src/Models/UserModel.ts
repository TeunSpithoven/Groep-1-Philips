export class UserModel {
    Id: number;
    Username: string;
    Password: string
  
    constructor(id: number, username: string, password: string) {
      this.Id = id;
      this.Username = username;
      this.Password = password;
    }
  }