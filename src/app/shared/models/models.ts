interface IBaseEntity{
    id:number;
}
export interface IBaseUser {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    eyeColor: string;
    birthDate: string;
}
export interface IUser extends IBaseUser, IBaseEntity{ }