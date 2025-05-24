import { IUser } from "./user";

export interface IHero{
    userId?: string,
    name: string,
    gender: string,
    mail: string,
    age: number,
    address: string,
    tags: string[],
    inforUser?: IUser
}