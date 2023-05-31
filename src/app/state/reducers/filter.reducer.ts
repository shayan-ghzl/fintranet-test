import { createReducer, on } from "@ngrx/store";
import { AgeOperatin, IFilter, IUser } from "src/app/shared/models/models";
import { userActionAdd, usersActionSet, userActionRemove } from "../actions/user.action";
import { filtersActionSet } from "../actions/filter.action";

// set last 24 hours to datepicker
const temp = new Date();
temp.setDate(temp.getDate() - 1);

const initialState: IFilter = {
    gender: '',
    age:{
        operation: AgeOperatin.EQUAL,
        value: 0
    },
    eyeColor: '',
    birthDate: [new Date(), temp]
};

export const filtersReducer = createReducer(
    initialState,
    on(filtersActionSet, (state, prop) => prop.filters),

)
