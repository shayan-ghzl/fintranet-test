import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IAge, IAgeOperation, IEyeColor, IFilter, IGender, IRangeDate, IUser } from "src/app/shared/models/models";


export const FilterActions = createActionGroup({
  source: 'Filter API/Manipulation',
  events: {
    set: props<{ filters: IFilter; }>(),
    dateUpdate: props<{ dateFilter: IRangeDate; }>(),
    genderUpdate: props<{ gender: IGender; }>(),
    ageOperationUpdate: props<{ operation: IAgeOperation; }>(),
    ageUpdate: props<{ age: IAge; }>(),
    eyeColorUpdate: props<{ eyeColor: IEyeColor; }>(),
  },
});

// --------------------------------

export const UserActions = createActionGroup({
  source: 'User API/Manipulation',
  events: {
    startEffect: emptyProps(),
    set: props<{ users: IUser[]; }>(),
    add: props<{ user: IUser; }>(),
    remove: props<{ userId: number; }>(),
  },
});
