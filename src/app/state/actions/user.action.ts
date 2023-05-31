import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/shared/models/models";

export const userActionStartEffect = createAction('[User Start Effect]');
export const usersActionSet = createAction('[Users Set]', props<{ users: IUser[] }>());
export const userActionAdd = createAction('[User Add]', props<{ user: IUser }>());
export const userActionRemove = createAction('[User Remove]', props<{ userId: number }>());
