import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/shared/models/models";

export const userActionStartEffect = createAction('[Users] Start Effect');
export const usersActionSet = createAction('[Users] Set', props<{ users: IUser[] }>());
export const userActionAdd = createAction('[Users] Add', props<{ user: IUser }>());
export const userActionRemove = createAction('[Users] Remove', props<{ userId: number }>());
