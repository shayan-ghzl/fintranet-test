export enum AgeOperatin {
    EQUAL = 1,
    GREATER = 2,
    SMALLER = 3
}
export interface IFilter{
        gender: string,
        age:{
            operation: AgeOperatin,
            value: number
        },
        eyeColor: string,
        birthDate: Date[]
}

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