export interface IAgeOperation{
    equal: boolean;
    greater: boolean;
    smaller: boolean;
}
export interface IGender{
    female: boolean;
    male: boolean;
    others: boolean;
}
export interface IAge{
    operation: IAgeOperation,
    value: number
}
export interface IEyeColor{
    [key: string]:boolean
}
export type IRangeDate = [Date, Date] | [Date, null];
export interface IFilter{
    gender: IGender,
    age: IAge,
    eyeColor: IEyeColor,
    birthDate: IRangeDate
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