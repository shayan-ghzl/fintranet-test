import { IUser } from "../shared/models/models";

export interface AppState {
    users: IUser[] | null;
}