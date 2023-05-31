import { createReducer, on } from "@ngrx/store";
import { IUser } from "src/app/shared/models/models";
import { userActionAdd, usersActionSet, userActionRemove } from "../actions/user.action";


const initialState: IUser[] = [];

export const userReducer = createReducer(
    initialState,
    on(usersActionSet, (state, prop) => prop.users),
    on(userActionAdd, (state, prop) => {
        let updateStatus = false;
        const updatedList = state.map(p => {
            if (p.id == prop.user.id) {
                updateStatus = true;
                return prop.user;
            } else {
                return p;
            }
        });
        if (!updateStatus) {
            updatedList.push(prop.user);
        }
        return updatedList;
    }),
    on(userActionRemove, (state, prop) => state.filter(p => p.id != prop.userId)),
)
