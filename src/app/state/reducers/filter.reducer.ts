import { createReducer, on } from "@ngrx/store";
import { IFilter } from "src/app/shared/models/models";
import { ageFilterActionUpdate, ageOperationFilterActionUpdate, dateFilterActionUpdate, filtersActionSet, genderFilterActionUpdate } from "../actions/filter.action";

// set last 24 hours to datepicker
const temp = new Date();
temp.setDate(temp.getDate() - 1);

const initialState: IFilter = {
    gender: {
        female: true,
        male: true,
        others: true
    },
    age:{
        operation: {
            equal: true,
            greater: false,
            smaller: false
        },
        value: 0
    },
    eyeColor: {},
    birthDate: [new Date(), temp]
};

export const filtersReducer = createReducer(
    initialState,
    on(filtersActionSet, (state, prop) => prop.filters),
    on(genderFilterActionUpdate, (state, prop) => ({...state, gender: prop.gender})),
    on(dateFilterActionUpdate, (state, prop) => ({...state, birthDate: prop.dateFilter})),
    on(ageFilterActionUpdate, (state, prop) => ({...state, age: prop.age})),
    on(ageOperationFilterActionUpdate, (state, prop) => ({...state, age: {...state.age, operation: prop.operation}})),
)
