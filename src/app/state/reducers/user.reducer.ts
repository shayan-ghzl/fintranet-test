import { createReducer, on } from "@ngrx/store";
import { IUser } from "src/app/shared/models/models";
import { userActionAdd, usersActionSet, userActionRemove } from "../actions/user.action";

const initialState: IUser[] | null = null;

export const userReducer = createReducer(
    initialState as IUser[] | null,
    on(usersActionSet, (state, prop) => prop.users),
    on(userActionAdd, (state, prop) => {
        let updateStatus = false;
        let modifiedList: IUser[] = [];
        if(state){
            modifiedList = state.map(p => {
                if (p.id == prop.user.id) {
                    updateStatus = true;
                    return prop.user;
                } else {
                    return p;
                }
            });
        }
        if (!updateStatus) {
            modifiedList.push(prop.user);
        }
        return modifiedList;
    }),
    on(userActionRemove, (state, prop) => (state && state.filter(p => p.id != prop.userId)) || []),
)
