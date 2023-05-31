import { IFilter, IUser } from "../shared/models/models";

export interface AppState {
    users: IUser[] | null;
    filters: IFilter;
}